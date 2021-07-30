import { LightningElement, wire, track } from 'lwc';
import FetchRecords from '@salesforce/apex/FetchStudentsRecordAuraController.FetchRecords';
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
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


    lmsSubscription = undefined;

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

        if (this.lmsSubscription === undefined) {
            console.log('subcribing to message!');
            this.lmsSubscription = subscribe(
                this.messageContext,
                recordAdded,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );

        }




    }

    disconnectedCallback() {
        unsubscribe(this.lmsSubscription);
        this.lmsSubscription = null;
    }

    handleMessage(message) {
        console.log('handling message');
        // 
        const evt = new ShowToastEvent({
            title: 'Info',
            variant: 'Info',
            message: 'Refreshing Records'
        });

        this.dispatchEvent(evt);
        FetchRecords().then(res => {
            this.data = [...res];
        }).catch(err => {

        });
    }





}