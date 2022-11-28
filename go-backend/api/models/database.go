package models

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

const dbuser = "root"
const dbpass = "password"
const dbname = "northwind"

type Shipper struct {
	shipperId   int
	companyName string
	phone       string
}

func GetShippers() []Shipper {
	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1：3306/"+dbname)

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

		err = results.Scan(&shipper.shipperId, &shipper.companyName, &shipper.phone)
		if err != nil {
			panic(err.Error())
		}

		shippers = append(shippers, shipper)
	}

	return shippers

}
