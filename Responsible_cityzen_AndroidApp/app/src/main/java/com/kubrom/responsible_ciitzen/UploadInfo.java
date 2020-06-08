package com.kubrom.responsible_ciitzen;

import android.os.Build;
import androidx.annotation.RequiresApi;


class UploadInfo {
    private String senderName,senderPhoneNumber,location,description,authority,url, currentDate;
    private double latitude, longitude;


    @RequiresApi(api = Build.VERSION_CODES.O)
    public UploadInfo(String senderName, String senderPhoneNumber, String location, double latitude, double longitude, String description, String authority, String url,String currentDate) {
        this.senderName = senderName;
        this.senderPhoneNumber = senderPhoneNumber;
        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
        this.authority = authority;
        this.url = url;
        this.currentDate = currentDate;
    }

    public String getSenderName() {
        return senderName;
    }

    public String getSenderPhoneNumber() {
        return senderPhoneNumber;
    }

    public String getLocation() {
        return location;
    }

    public String getDescription() {
        return description;
    }

    public String getAuthority() {
        return authority;
    }

    public String getUrl() {
        return url;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public String getCurrentDate() {
        return currentDate;
    }

    @Override
    public String toString() {
        return "UploadInfo{" +
                "senderName='" + senderName + '\'' +
                ", senderPhoneNumber='" + senderPhoneNumber + '\'' +
                ", location='" + location + '\'' +
                ", latitude='" + latitude + '\'' +
                ", longitude='" + longitude + '\'' +
                ", description='" + description + '\'' +
                ", authority='" + authority + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
