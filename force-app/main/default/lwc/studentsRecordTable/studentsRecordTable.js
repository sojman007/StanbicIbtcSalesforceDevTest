import { LightningElement } from 'lwc';
import FetchRecords from '@salesforce/apex/FetchStudentsRecordAuraController.FetchRecords';
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


    data = [];
    columns = columns;
    connectedCallback() {
        FetchRecords().then(res => {
            this.data = [...res];
        }).catch(err => {

        });

    }


}