export abstract class User {
    name: string;
    email: string;
    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }
    get getEmail() {
        return this.email;
    }

    abstract absClass();
}

export abstract class EmployeeUser extends User {
    name: string;
    email: string;
    empId: string;
    constructor(name: string, email: string, empId: string) {
        super(name, email);
        this.empId = empId;
    }
    get getEmpId() {
        return this.empId;
    }

    absClass() {
        console.log("employee absClass");
    }

}

export abstract class CorporateUser extends User {
    name: string;
    email: string;
    companyId: string;
    constructor(name: string, email: string, companyId: string) {
        super(name, email);
        this.name = name;
        this.email = email;
        this.companyId = companyId;
    }
    get getCompanyId() {
        return this.companyId;
    }

    absClass() {
        console.log("corporate absClass");
    }
}

export class Manager extends EmployeeUser {
    name: string;
    email: string;
    empId: string;
    constructor(name: string, email: string, empId: string) {
        super(name, email, empId);
    }
}

export class Admin extends CorporateUser {
    name: string;
    email: string;
    companyId: string;
    constructor(name: string, email: string, companyId: string) {
        super(name, email, companyId);
    }
}