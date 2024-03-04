namespace api._Interfaces
{
    public interface IFileService
    {
        Task<string> UploadFileAsync(IFormFile file, string fileName);
        Task<bool> DeleteFileAsync(string imgUrl);
        Task<string> GeneratePublicLink(string imgUrl);
        bool IsFileExtensionAllowed(IFormFile file);
    }
}