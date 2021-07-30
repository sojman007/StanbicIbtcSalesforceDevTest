public class FetchStudentsRecordAuraController {
    
    @AuraEnabled
    public static List<Student__c> FetchRecords(){
        return  new List<Student__c>([Select First_Name__c, Last_Name__c , Gender__c , State_Of_Origin__c , Class__c from Student__c]);
    }



}
