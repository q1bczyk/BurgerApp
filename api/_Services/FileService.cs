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

        public async Task<int> UploadFileAsync(IFormFile file, string fileName)
        {
                 string fileExtension = Path.GetExtension(file.FileName)?.TrimStart('.').ToLower();

                using(Stream stream = file.OpenReadStream())
                {
                    var response = await filesContainer.UploadBlobAsync($"{fileName}.{fileExtension}", stream);
                    return response.GetRawResponse().Status;
                }
        }

         public bool IsFileExtensionAllowed(IFormFile file)
        {
            string[] allowedExtensions = { ".jpg", ".jpeg", ".png" };
            var extension = Path.GetExtension(file.FileName)?.ToLower();
            return allowedExtensions.Contains(extension);
        }

    }
}