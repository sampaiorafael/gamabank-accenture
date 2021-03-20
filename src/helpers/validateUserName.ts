const validateUser = (user: string) =>{

      let userForm = /^[a-zA-Z0-9]+[a-zA-Z0-9-]+([a-zA-Z0-9-]+)*$/;
         
       if(!user || user === undefined || user === null || user === '') return false;

       if(user.length < 6) return false;
    
       if(user.length > 11) return false;

       if(!user.match(userForm)) return false;

    
    }
    
    export default validateUser;