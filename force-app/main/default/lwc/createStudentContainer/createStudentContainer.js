import { LightningElement, track } from 'lwc';
import NavigationMixin from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import FIRST_NAME from "@salesforce/schema/Student__c.First_Name__c";
import LAST_NAME from "@salesforce/schema/Student__c.Last_Name__c";
import GENDER from "@salesforce/schema/Student__c.Gender__c";
import STATE from "@salesforce/schema/Student__c.State_Of_Origin__c";
import CLASS from "@salesforce/schema/Student__c.Class__c";



export default class CreateStudentContainer extends LightningElement {

    //fields = [FIRST_NAME, LAST_NAME, GENDER, STATE, CLASS];
    firstName = FIRST_NAME;
    lastName = LAST_NAME;
    gender = GENDER;
    state = STATE;
    studentClass = CLASS;

    @track fontClass = 'blueFont';

    handleSuccess(e) {
        const sucessEvt = new ShowToastEvent({
            title: 'Success',
            variant: 'success',
            message: 'Student Created Successfully'
        });

        this.dispatchEvent(sucessEvt);

        // navigate to list view
    }

    handleGenderChange(e) {

        console.log('event details ', e.detail);
        console.log('target', e.target.value);

        switch (e.target.value.toLowerCase()) {

            case 'male':
                this.fontClass = 'blueFont'
                break;
            case 'female':
                this.fontClass = 'pinkFont'
                break;
        }
    }




}