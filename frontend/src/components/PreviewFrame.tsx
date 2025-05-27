import { WebContainer } from '@webcontainer/api';
import React, { useEffect, useState } from 'react';

interface PreviewFrameProps {
  files: any[];
  webContainer: WebContainer;
}

export function PreviewFrame({ files, webContainer }: PreviewFrameProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function main() {
    try {
      setLoading(true);
      setError(null);

      // Check if we have files
      if (!files || files.length === 0) {
        setError("No files available to preview");
        return;
      }

      // Check if package.json exists
      const hasPackageJson = files.some(file => 
        file.type === 'file' && file.name === 'package.json'
      );

      if (!hasPackageJson) {
        setError("No package.json found in the project");
        return;
      }

      console.log("Starting npm install...");
      const installProcess = await webContainer.spawn('npm', ['install']);

      installProcess.output.pipeTo(new WritableStream({
        write(data) {
          console.log("npm install output:", data);
        }
      }));

      // Wait for install to complete
      await installProcess.exit;

      console.log("Starting dev server...");
      const devProcess = await webContainer.spawn('npm', ['run', 'dev']);

      devProcess.output.pipeTo(new WritableStream({
        write(data) {
          console.log("dev server output:", data);
        }
      }));

      // Wait for `server-ready` event
      webContainer.on('server-ready', (port, url) => {
        console.log("Server ready on port:", port);
        console.log("Server URL:", url);
        setUrl(url);
        setLoading(false);
      });

    } catch (err) {
      console.error("Error in preview:", err);
      setError(err instanceof Error ? err.message : "Failed to start preview");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (webContainer) {
      main();
    }
  }, [webContainer, files]);

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-400">
        <div className="text-center">
          <p className="mb-2">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center text-gray-400">
      {loading && <div className="text-center">
        <p className="mb-2">Loading preview...</p>
      </div>}
      {url && <iframe width={"100%"} height={"100%"} src={url} />}
    </div>
  );
}