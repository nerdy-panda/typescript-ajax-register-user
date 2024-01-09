class Program {
    constructor() {
        this.loading = null;
        this.notificationContainer = null;
        this.formSubmitListener = (event) => {
            event.preventDefault();
            const form = event.target;
            const data = this.getFormData(form);
            const queryStringData = this.formDataToQueryString(data);
            this.submitFormViaAjax(form, queryStringData, this.receiveRegisterResponseListener);
        };
        this.receiveRegisterResponseListener = (event) => {
            this.hideLoading();
            const request = event.target;
            const statusCode = request.status;
            const shouldProcessStatusCodes = [200, 409];
            const isNoProcess = shouldProcessStatusCodes.indexOf(statusCode) === -1;
            if (isNoProcess)
                return;
            const responseJson = request.response;
            const response = window.JSON.parse(responseJson);
            const responseMessage = response.message;
            let notification;
            if (statusCode == 200)
                notification = this.okNotificationElement(responseMessage);
            else
                notification = this.errorNotificationElement(responseMessage);
            this.printNotification(notification);
            this.removeElementAfter(notification, 5000);
        };
    }
    main() {
        const form = window.document.body.querySelector("form");
        this.loading = window.document.body.querySelector("#loading");
        this.notificationContainer = window.document.body.querySelector("#notification-container");
        form.addEventListener('submit', this.formSubmitListener);
    }
    getFormData(form) {
        const result = [];
        const formData = new FormData(form);
        let formDataElement;
        for (formDataElement of formData)
            result.push(formDataElement);
        return result;
    }
    formDataToQueryString(data) {
        let result = "";
        const dataLength = data.length;
        const dataRealLength = dataLength - 1;
        for (let counter = 0; counter <= dataRealLength; counter++) {
            const dataItem = data[counter];
            const isNotLast = counter !== dataRealLength;
            result += `${dataItem[0]}=${dataItem[1]}`;
            if (isNotLast)
                result += "&";
        }
        return result;
    }
    submitFormViaAjax(form, data, receiveResponseListener) {
        const hasData = data.length > 0;
        const method = form.method;
        let action = form.action;
        const methodIsGet = method.toLowerCase() == "get";
        if (methodIsGet && hasData)
            action += `?${data}`;
        const request = new XMLHttpRequest();
        if (receiveResponseListener !== undefined)
            request.addEventListener("load", receiveResponseListener);
        request.open(method, action);
        if (methodIsGet)
            return request.send();
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(data);
        this.showLoading();
    }
    showLoading() {
        var _a;
        (_a = this.loading) === null || _a === void 0 ? void 0 : _a.classList.add('dis-block');
    }
    hideLoading() {
        var _a;
        (_a = this.loading) === null || _a === void 0 ? void 0 : _a.classList.remove('dis-block');
    }
    pureNotificationElement(html) {
        const notification = window.document.createElement('div');
        notification.innerHTML = html;
        notification.classList.add('notification');
        return notification;
    }
    errorNotificationElement(html) {
        const notification = this.pureNotificationElement(html);
        notification.classList.add('error');
        return notification;
    }
    okNotificationElement(html) {
        const notification = this.pureNotificationElement(html);
        notification.classList.add('ok');
        return notification;
    }
    printNotification(notification) {
        var _a;
        (_a = this.notificationContainer) === null || _a === void 0 ? void 0 : _a.appendChild(notification);
    }
    removeElementAfter(element, delay) {
        window.setTimeout(this.removeElement, delay, element);
    }
    removeElement(element) {
        element.remove();
    }
}
export default Program;
//# sourceMappingURL=Program.js.map