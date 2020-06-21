package com.kubrom.responsible_ciitzen;

public class Item {

  //  @SerializedName("name")
    private String name;
    private String description;
    private double location;
    private String phoneNumber;
    private String url;

    public Item(String name, String description, double location, String phoneNumber, String url){
        this.description = description;
        this.name = name;
        this.location = location;
        this.phoneNumber = phoneNumber;
        this.url = url;

    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public double getLocation() {
        return location;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getUrl() {
        return url;
    }
}
