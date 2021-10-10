package com.emrys.core.platform.java;

public abstract class AbstractClass {

    private int id;

    public AbstractClass(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
