package com.kydlai.web33;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
@Data
public class Attempt implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column
    private double x;
    @Column
    private double y;
    @Column
    private double r;
    @Column
    private boolean hit;
    @Column
    private String startTime;
    @Id
    private Long id;

    public Attempt() {
    }
}
