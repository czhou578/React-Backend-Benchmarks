package models

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

const dbuser = "root"
const dbpass = "password"
const dbname = "northwind"

type Shipper struct {
	ShipperId   int
	CompanyName string
	Phone       string
}

type EmployeeId struct {
	CountUserId int
}

func GetShippers() []Shipper {
	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:3306)/"+dbname)

	if err != nil {
		fmt.Println("error", err.Error())
		return nil
	}

	defer db.Close()

	results, err := db.Query("Select * from shipper")

	if err != nil {
		fmt.Println("error", err.Error())
		return nil
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

	return shippers

}

func GetCountNumId() []EmployeeId {
	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:3306)/"+dbname)
	if err != nil {
		fmt.Println("error", err.Error())
		return nil
	}

	defer db.Close()

	results, err := db.Query("select count(employeeId) from employeeterritory natural join region natural join territory group by regionId")

	if err != nil {
		fmt.Println("error", err.Error())
		return nil
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

	return countEmployees

}

func NewCategoryInsert() int64 {
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

	fmt.Printf("The last inserted row id: %d\n", lastId)
	return lastId
}
