class GlobalConfigs {
}

class GlobalConfigsDevelopment extends GlobalConfigs {

    public urls = {
        admin: "http://localhost:8080/api/admin/",
        company: "http://localhost:8080/api/company/",
        customer: "http://localhost:8080/api/customer/",
        login: "http://localhost:8080/api/login"
    };
}

class GlobalConfigsProduction extends GlobalConfigs {

    public urls = {
        // admin: "http://localhost:8080/api/admin/",
        // company: "http://localhost:8080/api/company/",
        // customer: "http://localhost:8080/api/customer/",
        // login: "http://localhost:8080/api/login"
        admin: "http://coupon-system-db:8080/api/admin/",
        company: "http://coupon-system-db:8080/api/company/",
        customer: "http://coupon-system-db:8080/api/customer/",
        login: "http://coupon-system-db:8080/api/login"
    };
}

const globalConfigs = process.env.NODE_ENV === "development" ? new GlobalConfigsDevelopment() : new GlobalConfigsProduction();

export default globalConfigs;