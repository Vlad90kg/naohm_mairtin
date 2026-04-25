import { useRef } from 'react';
import { Upload } from 'lucide-react';

type MediaUploadButtonProps = {
  accept?: string;
  className?: string;
  label?: string;
  onSelect: (url: string, file: File) => void;
};

export function MediaUploadButton({
  accept = 'image/*',
  className = '',
  label = 'Upload from device',
  onSelect,
}: MediaUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          onSelect(URL.createObjectURL(file), file);
          e.target.value = '';
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-50 px-4 py-3.5 font-black uppercase tracking-widest text-[10px] text-[#1E3A8A] transition-all hover:bg-blue-100 ${className}`}
      >
        <Upload size={14} />
        {label}
      </button>
    </>
  );
}
