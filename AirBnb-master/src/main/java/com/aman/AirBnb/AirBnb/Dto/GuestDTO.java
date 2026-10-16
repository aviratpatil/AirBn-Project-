package com.aman.AirBnb.AirBnb.Dto;

import com.aman.AirBnb.AirBnb.Entities.UserEntity;
import com.aman.AirBnb.AirBnb.Enums.Gender;
import lombok.Data;

@Data
public class GuestDTO {
    private Long id;
    private String name;
    private Gender gender;
    private Integer age;
    private String email;
    private String phone;
    private String address;
    private String checkInTime;
    private String checkOutTime;
    private String idProofPhoto;
}
