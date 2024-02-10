using api._Helpers;
using api._Interfaces;
using Azure.Storage.Blobs;
using Microsoft.Extensions.Options;

namespace api._Services
{
    public class FileService : IFileService
    {
        private readonly BlobContainerClient filesContainer;
    
        public FileService(IOptions<BlobStorageSettings> config)
        {
            string blobConnection = $"DefaultEndpointsProtocol=https;AccountName={config.Value.AccountName};AccountKey={config.Value.Key};EndpointSuffix=core.windows.net";

            this.filesContainer = new BlobContainerClient(blobConnection, config.Value.ContainerName);
        }

        public async Task<string> UploadFileAsync(IFormFile file, string fileName)
        {
                 string fileExtension = Path.GetExtension(file.FileName)?.TrimStart('.').ToLower();

                using(Stream stream = file.OpenReadStream())
                {
                    var response = await filesContainer.UploadBlobAsync($"{fileName}.{fileExtension}", stream);
                    
                    if (response.GetRawResponse().Status == 201 || response.GetRawResponse().Status == 200)
                        return filesContainer.GetBlobClient($"{fileName}.{fileExtension}").Uri.ToString();

                    return null;
                }
        }

        public async Task<bool> DeleteFileAsync(string imgUrl)
        {
            var uri = new Uri(imgUrl);
            var blobPath = uri.LocalPath.TrimStart('/').Replace("burger-app/", "");
            var fileToDelete = filesContainer.GetBlobClient(blobPath);

            if(await fileToDelete.ExistsAsync())
            {
                await fileToDelete.DeleteIfExistsAsync();
                return true;
            }

            return false;
                
        }   

         public bool IsFileExtensionAllowed(IFormFile file)
        {
            string[] allowedExtensions = { ".jpg", ".jpeg", ".png" };
            var extension = Path.GetExtension(file.FileName)?.ToLower();
            return allowedExtensions.Contains(extension);
        }

    }
}