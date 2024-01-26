namespace api._Interfaces
{
    public interface IFileService
    {
        Task<string> UploadFileAsync(IFormFile file, string fileName);
        bool IsFileExtensionAllowed(IFormFile file);
    }
}