import type { Metadata } from 'next';
import AIStudio from './AIStudio';

export const metadata: Metadata = {
  title: 'AI Studio',
  description: 'A home for NOXES AI tools. Open Prompt Studio and turn rough ideas into clear, structured prompts.',
};

export default function AIStudioPage() {
  return <AIStudio />;
}
