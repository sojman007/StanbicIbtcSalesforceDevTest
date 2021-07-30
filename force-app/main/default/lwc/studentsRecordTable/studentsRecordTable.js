import { LightningElement, wire, track } from 'lwc';
import FetchRecords from '@salesforce/apex/FetchStudentsRecordAuraController.FetchRecords';
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import recordAdded from '@salesforce/messageChannel/recordAdded__c';
// should automatically update when a new record is added

const columns = [
    {
        label: 'First Name', fieldName: 'First_Name__c'
    },
    { label: 'Last Name', fieldName: 'Last_Name__c' },
    { label: 'Gender', fieldName: 'Gender__c' },
    { label: 'State', fieldName: 'State_Of_Origin__c' },
    {
        label: 'Class', fieldName: 'Class__c',
    }

]




export default class StudentsRecordTable extends LightningElement {

    lmsSubscription;

    @wire(MessageContext)
    messageContext;

    @track
    data = [];
    columns = columns;
    connectedCallback() {
        FetchRecords().then(res => {
            this.data = [...res];
        }).catch(err => {

        });

        if (this.lmsSubscription === null) {
            this.lmsSubscription = subscribe(
                this.messageContext,
                recordAdded,
                (message) => this.handleMessage(message)
            );

        }




    }

    disconnectedCallback() {


    }

    handleMessage(message) {
        console.log(message);
        // 
        console.log("refreshing data!!");
        FetchRecords().then(res => {
            this.data = [...res];
        }).catch(err => {

        });
    }





}