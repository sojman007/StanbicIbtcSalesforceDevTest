@RestResource(urlmapping='/students')
global class StudentRestService {



    /**
     * @description GetStudents checks the url to confirm that there is a series of Id
     * for every ID specified in the request body , it returns valid records!!!
     * @return   return description
     */ 
    @HttpGet
    global static List<Student__c> GetAllStudentsOrGetStudentsById(){  
        RestRequest req = RestContext.Request;

        string query = 'Select Id, First_Name__c, Last_Name__c , Gender__c,State_Of_Origin__c From Student__c';
        if(req.requestBody != null) {
            List<string> studentIds = (List<String>)Json.deserialize(req.requestBody.toString(), List<String>.class);
            query += 'Where Id IN :studentIds';
        }
        return (List<Student__c>)Database.query(query);
    }

    @HttpPost
    global  static void CreateStudentRecord(CreateStudentModel reqBody){
        RestResponse res = RestContext.response;
        if(reqBody != null){
            Student__c foundRecord = new Student__c();
            foundRecord.First_Name__c = String.isBlank(reqBody.firstName) || reqBody.firstName == null ? foundRecord.First_Name__c : reqBody.firstName;
            foundRecord.Last_Name__c = String.isBlank(reqBody.lastName) || reqBody.lastName == null ? foundRecord.Last_Name__c : reqBody.lastName;
            foundRecord.Gender__c = String.isBlank(reqBody.gender) || reqBody.gender == null ? foundRecord.Gender__c : reqBody.gender;
            foundRecord.State_Of_Origin__c = String.isBlank(reqBody.state) || reqBody.state == null ? foundRecord.State_Of_Origin__c : reqBody.state;
            foundRecord.Class__c = String.isBlank(reqBody.studentClass) || reqBody.studentClass == null ? foundRecord.Class__c : reqBody.studentClass;
            
            try{
                insert foundRecord;
                res.statusCode = 200;
                res.responseBody = Blob.valueOf('Record updated successfully');
            
            }catch(Exception e){
                res.statusCode = 500;
                res.responseBody = Blob.valueOf('An Error Has occured While trying to update the record: ' + e.getMessage());
            }
            
        }

    }
    

    @HttpPut
    global  static void UpdateStudentRecord(UpdateStudentModel reqBody){
        RestResponse res = RestContext.response;
        if(reqBody != null){
            List<Student__c> queryRes = [Select First_Name__c, Last_Name__c , Gender__c , State_Of_Origin__c , Class__c 
                                        FROM Student__c 
                                        WHERE Id =:reqBody.studentId];
            
            if(queryRes != null && queryRes.size() > 0){
                Student__c foundRecord = queryRes[0];
                foundRecord.First_Name__c = String.isBlank(reqBody.firstName) || reqBody.firstName == null ? foundRecord.First_Name__c : reqBody.firstName;
                foundRecord.Last_Name__c = String.isBlank(reqBody.lastName) || reqBody.lastName == null ? foundRecord.Last_Name__c : reqBody.lastName;
                foundRecord.Gender__c = String.isBlank(reqBody.gender) || reqBody.gender == null ? foundRecord.Gender__c : reqBody.gender;
                foundRecord.State_Of_Origin__c = String.isBlank(reqBody.state) || reqBody.state == null ? foundRecord.State_Of_Origin__c : reqBody.state;
                foundRecord.Class__c = String.isBlank(reqBody.studentClass) || reqBody.studentClass == null ? foundRecord.Class__c : reqBody.studentClass;
                
                try{
                    update foundRecord;
                    res.statusCode = 200;
                    res.responseBody = Blob.valueOf('Record updated successfully');
                
                }catch(Exception e){
                    res.statusCode = 500;
                    res.responseBody = Blob.valueOf('An Error Has occured While trying to update the record: ' + e.getMessage());
                }
                
            
            }

        }

    }



    @HttpDelete
    global static void DeleteRecords(){
        RestRequest req = RestContext.Request;
        RestResponse res = RestContext.Response;
        string query = 'Select Id, First_Name__c, Last_Name__c , Gender__c,State_Of_Origin__c From Student__c';
        if(req.requestBody != null) {
            List<string> studentIds = (List<string>) Json.deserialize(req.requestBody.toString(), List<String>.class);
            query += 'Where Id IN :studentIds';
            List<Student__c> response = (List<Student__c>)Database.query(query);
            delete response;
            res.statusCode = 204;
            res.responseBody = Blob.valueOf('Records Deleted Successfully');
        }
    }
    
}
