namespace api.Models
{
    public class ConnectionString
    {
        public string cs {get; set;}

        public ConnectionString() 
        {
            string host = "u6354r3es4optspf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            string database = "s96mrxz0sv8xh2ll";
            string port = "3306";
            string userName = "mb0fmhn0wha1tmbr";
            string password = "a27w662yybzxmiwm";

            cs = $@"host = {host}; database = {database}; port = {port}; username = {userName}; password = {password};";
        }
    }
}