namespace api._Models
{
    public class HashedPasswordModel
    {
        public byte[] HashedPassword;
        public byte[] Key;

        public HashedPasswordModel(byte[] hashedPassword, byte[] key)
        {
            this.HashedPassword = hashedPassword;
            this.Key = key;
        }
    }
}