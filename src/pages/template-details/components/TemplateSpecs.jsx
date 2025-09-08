import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TemplateSpecs = ({ template }) => {
  const [expandedSections, setExpandedSections] = useState({
    tech: true,
    features: true,
    files: false,
    compatibility: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const SpecSection = ({ title, icon, sectionKey, children }) => (
    <div className="border border-border rounded-lg">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon name={icon} size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <Icon 
          name={expandedSections?.[sectionKey] ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground"
        />
      </button>
      {expandedSections?.[sectionKey] && (
        <div className="px-4 pb-4 border-t border-border">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground mb-6">Template Specifications</h2>
      {/* Technology Stack */}
      <SpecSection title="Technology Stack" icon="Code" sectionKey="tech">
        <div className="grid grid-cols-2 gap-4 mt-4">
          {template?.techStack?.map((tech, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm text-foreground">{tech}</span>
            </div>
          ))}
        </div>
      </SpecSection>
      {/* Features */}
      <SpecSection title="Key Features" icon="Star" sectionKey="features">
        <div className="grid grid-cols-1 gap-3 mt-4">
          {template?.features?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name="Check" size={16} className="text-success mt-0.5" />
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </SpecSection>
      {/* Included Files */}
      <SpecSection title="Included Files" icon="FileText" sectionKey="files">
        <div className="space-y-3 mt-4">
          {template?.includedFiles?.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
              <div className="flex items-center space-x-3">
                <Icon name="File" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{file?.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">{file?.size}</span>
            </div>
          ))}
        </div>
      </SpecSection>
      {/* Browser Compatibility */}
      <SpecSection title="Browser Compatibility" icon="Globe" sectionKey="compatibility">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {template?.browserSupport?.map((browser, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded-md">
              <Icon name="Check" size={14} className="text-success" />
              <span className="text-sm text-foreground">{browser}</span>
            </div>
          ))}
        </div>
      </SpecSection>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="text-center p-4 bg-card border border-border rounded-lg">
          <div className="text-2xl font-bold text-primary">{template?.pages}</div>
          <div className="text-sm text-muted-foreground">Pages</div>
        </div>
        <div className="text-center p-4 bg-card border border-border rounded-lg">
          <div className="text-2xl font-bold text-primary">{template?.components}</div>
          <div className="text-sm text-muted-foreground">Components</div>
        </div>
        <div className="text-center p-4 bg-card border border-border rounded-lg">
          <div className="text-2xl font-bold text-primary">{template?.fileSize}</div>
          <div className="text-sm text-muted-foreground">File Size</div>
        </div>
        <div className="text-center p-4 bg-card border border-border rounded-lg">
          <div className="text-2xl font-bold text-primary">{template?.lastUpdated}</div>
          <div className="text-sm text-muted-foreground">Last Updated</div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSpecs;