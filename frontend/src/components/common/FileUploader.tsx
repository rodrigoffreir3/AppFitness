import React, { useState } from 'react';
import { uploadFile } from '../../services/api';

interface FileUploaderProps {
  label: string;
  onUploadSuccess: (url: string) => void;
  currentUrl?: string; // Se já tiver um arquivo salvo, mostra link
  accept?: string; // ex: ".pdf,image/*"
}

const FileUploader: React.FC<FileUploaderProps> = ({ label, onUploadSuccess, currentUrl, accept = ".pdf,.jpg,.jpeg,.png" }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) { // 20MB check no front
        setError("Arquivo muito grande. Máximo 20MB.");
        return;
    }

    setUploading(true);
    setError('');

    try {
      // Faz o upload real para o backend
      const url = await uploadFile(file);
      
      // Devolve a URL para o formulário pai salvar no banco
      onUploadSuccess(url); 
    } catch (err) {
      console.error(err);
      setError("Erro ao enviar arquivo.");
    } finally {
      setUploading(false);
    }
  };

  // Monta a URL completa para visualização
  const fullUrl = currentUrl ? `http://localhost:8080${currentUrl}` : null;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      <div className="flex items-center space-x-4">
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={uploading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-primary file:text-white
            hover:file:bg-primary/90"
        />
        {uploading && <span className="text-sm text-gray-500">Enviando... ⏳</span>}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {fullUrl && (
        <div className="mt-2 text-sm">
            <span className="text-green-600 font-bold mr-2">✓ Arquivo Anexado!</span>
            <a 
                href={fullUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary underline hover:text-blue-800"
            >
                Visualizar Arquivo Atual
            </a>
        </div>
      )}
    </div>
  );
};

export default FileUploader;