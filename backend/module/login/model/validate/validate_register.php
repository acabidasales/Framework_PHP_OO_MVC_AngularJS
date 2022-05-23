<?php
    
    function validate($email){
        if(DAOLogin::select_email($email)){
            $check=false;
        }else {
            $check=true;
        }
        return $check;

    }

?>