
public class Customer {

  private Integer id;
  private String companyName;
  private String contactName;
  private String contactTitle;
  private String address;
  private String city;
  private String postalCode;
  private String country;
  private String phone;
  private String fax;

  public Customer() {
  };

  public Customer(Integer Id, String companyName, String contactName, String contactTitle, String address, String city,
      String postalCode, String country, String phone, String fax) {
    super();

    this.id = Id;
    this.companyName = companyName;
    this.contactName = contactName;
    this.contactTitle = contactTitle;
    this.address = address;
    this.city = city;
    this.postalCode = postalCode;
    this.country = country;
    this.phone = phone;
    this.fax = fax;

  }

  public void setId(Integer id) {

    this.id = id;
  }

  public Integer getId() {

    return id;
  }

  public void setCompanyName(String companyName) {
    this.companyName = companyName;
  }

  public String getCompanyName() {
    return companyName;
  }

  public void setContactName(
      String contact) {

    this.contactName = contact;
  }

  public String getContactName() {

    return contactName;
  }

  // public void setContactTitle(String c)

  public void setLastName(
      String lastName) {

    this.lastName = lastName;
  }

  public String getEmail() {

    return email;
  }

  public void setEmail(String email) {

    this.email = email;
  }
}