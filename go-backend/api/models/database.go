package models

import (
	"database/sql"
	"fmt"
	"log"
	"math"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

const dbuser = "root"
const dbpass = "Issaquah@411"
const dbname = "northwind"

const (
	maxRetries = 3
	baseDelay  = 100 * time.Millisecond
)

type Shipper struct {
	ShipperId   int
	CompanyName string
	Phone       string
}

type EmployeeId struct {
	CountUserId int
}

func GetShippers() ([]Shipper, map[string]int64) {
	start := time.Now()

	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:3306)/"+dbname)

	if err != nil {
		fmt.Println("error", err.Error())
		return []Shipper{}, nil
	}

	defer db.Close()

	results, err := db.Query("Select * from shipper")

	if err != nil {
		fmt.Println("error", err.Error())
		return []Shipper{}, nil
	}

	shippers := []Shipper{}

	for results.Next() {
		var shipper Shipper

		err = results.Scan(&shipper.ShipperId, &shipper.CompanyName, &shipper.Phone)

		if err != nil {
			panic(err.Error())
		}

		fmt.Println(shipper)

		shippers = append(shippers, shipper)
	}

	fmt.Println("test", shippers)

	operation_time := time.Since(start).Milliseconds()
	m := map[string]int64{
		"Operation Time": operation_time,
	}

	return shippers, m

}

func GetCountNumId() ([]EmployeeId, map[string]int64) {
	start := time.Now()

	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:3306)/"+dbname)
	if err != nil {
		fmt.Println("error", err.Error())
		return []EmployeeId{}, nil
	}

	defer db.Close()

	results, err := db.Query("select count(employeeId) from employeeterritory natural join region natural join territory group by regionId")

	if err != nil {
		fmt.Println("error", err.Error())
		return []EmployeeId{}, nil
	}

	countEmployees := []EmployeeId{}

	for results.Next() {
		var employeeCount EmployeeId

		err = results.Scan(&employeeCount.CountUserId)

		if err != nil {
			panic(err.Error())
		}

		countEmployees = append(countEmployees, employeeCount)

	}

	operation_time := time.Since(start).Milliseconds()
	m := map[string]int64{
		"Operation Time": operation_time,
	}

	return countEmployees, m

}

func NewCategoryInsert() (int64, int64) {
	start := time.Now()

	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:3306)/"+dbname)

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	results, err := db.Exec("Insert into category (categoryName, description, picture) values ('Seafood', 'tasty', null)")

	if err != nil {
		panic(err.Error())
	}

	lastId, err := results.LastInsertId()

	if err != nil {
		log.Fatal(err)
	}
	operation_time := time.Since(start).Milliseconds()

	fmt.Printf("The last inserted row id: %d\n", lastId)
	return lastId, operation_time
}

func UpdateCustomerWithRetry() (int64, int64, error) {

	var lastErr error
	for i := 0; i < maxRetries; i++ {
		lastId, operation_time, err := UpdateCustomer()
		if err == nil {
			return lastId, operation_time, nil
		}

		if isLockTimeout(err) {
			delay := time.Duration(math.Pow(2, float64(i))) * baseDelay
			log.Printf("Lock timeout, retrying in %v... (attempt %d/%d)", delay, i+1, maxRetries)
			time.Sleep(delay)
			lastErr = err
			continue
		}

		return 0, operation_time, err // If it's not a lock timeout, return immediately
	}

	return 0, 0, fmt.Errorf("failed after %d attempts: %v", maxRetries, lastErr)
}

func UpdateCustomer() (int64, int64, error) {
	start := time.Now()

	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:3306)/"+dbname)

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	results, err := db.Exec("Update product set productName = 'Product 1' where productId = 23")

	if err != nil {
		panic(err.Error())
	}

	lastId, err := results.RowsAffected()

	operation_time := time.Since(start).Milliseconds()
	fmt.Println("operation time in database, ", operation_time)

	return lastId, operation_time, err
}

func isLockTimeout(err error) bool {
	return err.Error() == "Error 1205: Lock wait timeout exceeded; try restarting transaction"
}

func DeleteSalesOrder() (int64, int64) {
	start := time.Now()

	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:3306)/"+dbname)

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	results, err := db.Exec("delete from salesorder order by orderId desc limit 1")

	if err != nil {
		panic(err.Error())
	}

	lastId, err := results.RowsAffected()

	if err != nil {
		log.Fatal(err)
	}
	operation_time := time.Since(start).Milliseconds()

	return lastId, operation_time
}
