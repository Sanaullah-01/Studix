import { getApiDocs } from '@/lib/swagger';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default async function ApiDocsPage() {
  const spec = await getApiDocs();
  
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto py-8">
        <SwaggerUI spec={spec} />
      </div>
    </div>
  );
}
