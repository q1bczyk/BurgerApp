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
        Task IFileService.TestConnection()
        {
            throw new NotImplementedException();
        }
    }
}