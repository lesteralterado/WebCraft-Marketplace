import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadSection = ({ formData, handleFileUpload, handleFileRemove, errors }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      const files = Array.from(e?.dataTransfer?.files);
      files?.forEach(file => handleFileUpload(file));
    }
  };

  const handleFileInputChange = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      const files = Array.from(e?.target?.files);
      files?.forEach(file => handleFileUpload(file));
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType?.startsWith('image/')) return 'Image';
    if (fileType?.includes('pdf')) return 'FileText';
    if (fileType?.includes('word') || fileType?.includes('document')) return 'FileText';
    if (fileType?.includes('excel') || fileType?.includes('spreadsheet')) return 'FileSpreadsheet';
    if (fileType?.includes('powerpoint') || fileType?.includes('presentation')) return 'Presentation';
    return 'File';
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Reference Materials</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Upload any reference materials, existing branding assets, inspiration examples, or project documents that will help us understand your vision better.
        </p>

        {/* File Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
            onChange={handleFileInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                <Icon name="Upload" size={24} className="text-muted-foreground" />
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-foreground">
                Drop files here or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports: Images, PDFs, Documents, Presentations (Max 10MB each)
              </p>
            </div>
            
            <Button variant="outline" size="sm">
              Choose Files
            </Button>
          </div>
        </div>

        {errors?.files && (
          <p className="text-sm text-error mt-2">{errors?.files}</p>
        )}

        {/* Uploaded Files List */}
        {formData?.files && formData?.files?.length > 0 && (
          <div className="mt-6">
            <h4 className="text-md font-medium text-foreground mb-3">Uploaded Files</h4>
            <div className="space-y-3">
              {formData?.files?.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-background rounded flex items-center justify-center">
                      <Icon name={getFileIcon(file?.type)} size={16} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{file?.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file?.size)}</p>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFileRemove(index)}
                    className="text-error hover:text-error hover:bg-error/10"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* File Upload Guidelines */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h5 className="text-sm font-medium text-foreground mb-2">Helpful File Types:</h5>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• <strong>Brand Assets:</strong> Logos, color palettes, brand guidelines</li>
            <li>• <strong>Design Inspiration:</strong> Screenshots of websites you like</li>
            <li>• <strong>Content:</strong> Text content, product catalogs, service descriptions</li>
            <li>• <strong>Wireframes:</strong> Sketches or mockups of desired layout</li>
            <li>• <strong>Requirements:</strong> Detailed project specifications or RFP documents</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FileUploadSection;