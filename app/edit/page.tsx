import type { Metadata } from 'next';
import EditFile from '@/components/EditFile';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Editable profile notes — VS Code Portfolio',
};

export default function EditPage() {
  return <EditFile />;
}
