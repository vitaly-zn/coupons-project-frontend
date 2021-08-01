import { Notyf } from "notyf";

class Notify {

    private notification = new Notyf({ duration: 5000, position: { x: "center", y: "top" }, ripple: true });

    public success(message: string) {
        this.notification.success("SUCCESS:<br />" + message);
    }

    public errorCustomMessage(message: string) {
        this.notification.error("ERROR:<br />" + message);
    }

    public error(err: any) {
        const message = this.extractMessage(err);
        this.notification.error("ERROR:<br />" + message);
    }

    private extractMessage(err: any): string {
        if (typeof err === "string") {
            return err;
        }

        if (typeof err?.response?.data?.message === "string") { // Backend exact error
            return err.response.data.message;
        }

        if (typeof err?.response?.data === "string") { // Backend exact error
            return err.response.data;
        }

        if (Array.isArray(err?.response?.data)) { // Backend exact errors
            return err.response.data[0];
        }

        // Must be last: 
        if (typeof err?.message === "string") {
            return err.message;
        }

        return "Some error occurred, please try again.";
    }

}

const notify = new Notify();

export default notify;