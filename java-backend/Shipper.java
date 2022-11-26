public class Shipper {

  public Shipper() {
  };

  public Shipper(Integer shipperId, String companyName, String phoneNumber) {
    super();
    this.shipperId = shipperId;
    this.companyName = companyName;
    this.phoneNumber = phoneNumber;
  }

  private Integer shipperId;
  private String companyName;
  private String phoneNumber;

  public void setShipperId(Integer id) {
    this.shipperId = id;
  }

  public Integer getShipperId() {
    return shipperId;
  }

  public void setCompanyName(String companyName) {
    this.companyName = companyName;
  }

  public String getCompanyName() {
    return companyName;
  }

  public void setPhoneNumber(String phonenum) {
    this.phoneNumber = phonenum;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }
}
