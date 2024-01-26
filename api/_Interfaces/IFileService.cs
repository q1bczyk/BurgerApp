namespace api._Interfaces
{
    public interface IFileService
    {
        Task<int> UploadFileAsync(IFormFile file, string fileName);
        bool IsFileExtensionAllowed(IFormFile file);
    }
}