
class Program {
    protected loading : HTMLElement | null = null ;
    protected notificationContainer : HTMLElement | null = null;
    main():void {
        const form:HTMLFormElement = <HTMLFormElement> window.document.body.querySelector("form");
        this.loading = window.document.body.querySelector("#loading");
        this.notificationContainer = window.document.body.querySelector("#notification-container");
        form.addEventListener('submit',this.formSubmitListener);
    }
    protected formSubmitListener = (event : SubmitEvent):void => {
        event.preventDefault();
        const form : HTMLFormElement = <HTMLFormElement> event.target;
        const data :[string,FormDataEntryValue][] = this.getFormData(form);
        const queryStringData = this.formDataToQueryString(data);
        this.submitFormViaAjax(form,queryStringData,this.receiveRegisterResponseListener);
    }
    protected getFormData(form:HTMLFormElement):[string,FormDataEntryValue][] {
        const result : [string,FormDataEntryValue][] = [];
        const formData = new FormData(form);
        let formDataElement : [string,FormDataEntryValue];
        for (formDataElement of formData)
            result.push(formDataElement);
        return result;
    }
    protected formDataToQueryString(data : [string,FormDataEntryValue][]):string {
        let result = "";
        const dataLength = data.length ;
        const dataRealLength = dataLength - 1 ;
        for(let counter = 0 ; counter <= dataRealLength ; counter++){
            const dataItem : [string,FormDataEntryValue] = data[counter];
            const isNotLast : boolean = counter !== dataRealLength;
            result+=`${dataItem[0]}=${dataItem[1]}`;
            if (isNotLast)
                result+="&";
        }
        return result;
    }
    protected submitFormViaAjax(form : HTMLFormElement , data : string , receiveResponseListener ?: Function ):void {
        const hasData = data.length > 0 ;
        const method : string = form.method;
        let action : string = form.action;
        const methodIsGet = method.toLowerCase() == "get";
        if (methodIsGet && hasData)
            action+=`?${data}`;

        const request : XMLHttpRequest = new XMLHttpRequest();
        if (receiveResponseListener!==undefined)
            request.addEventListener("load",<EventListener>receiveResponseListener);
        request.open(method,action);

        if (methodIsGet)
            return request.send();

        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(data);
        this.showLoading();
    }
    protected receiveRegisterResponseListener = (event:ProgressEvent):void => {
        this.hideLoading();
        const request : XMLHttpRequest = <XMLHttpRequest> event.target ;
        const statusCode = request.status;
        const shouldProcessStatusCodes : number[] = [200,409];
        const isNoProcess :boolean = shouldProcessStatusCodes.indexOf(statusCode) === -1 ;
        if (isNoProcess)
            return;
        const responseJson:string = request.response;
        type Response = {message : string , status : number };
        const response : Response = <Response> window.JSON.parse(responseJson);
        const responseMessage :string = response.message ;
        let notification : HTMLElement;
        if (statusCode==200)
            notification = this.okNotificationElement(responseMessage);
        else
            notification = this.errorNotificationElement(responseMessage);

        this.printNotification(notification);
        this.removeElementAfter(notification , 5000 );
    }
    protected showLoading():void{
        this.loading?.classList.add('dis-block');
    }
    protected hideLoading():void {
        this.loading?.classList.remove('dis-block');
    }
    protected pureNotificationElement(html : string):HTMLElement {
        const notification : HTMLElement = window.document.createElement('div');
        notification.innerHTML = html;
        notification.classList.add('notification');
        return notification;
    }
    protected errorNotificationElement(html : string ):HTMLElement {
        const notification : HTMLElement = this.pureNotificationElement(html);
        notification.classList.add('error');
        return notification;
    }
    protected okNotificationElement(html:string):HTMLElement {
        const notification : HTMLElement = this.pureNotificationElement(html);
        notification.classList.add('ok');
        return notification;
    }
    protected printNotification(notification : HTMLElement):void {
        this.notificationContainer?.appendChild(notification);
    }
    protected removeElementAfter(element : HTMLElement ,delay : number):void {
        window.setTimeout(this.removeElement , delay , element)
    }
    protected removeElement(element:HTMLElement):void {
        element.remove();
    }
}
export default Program;