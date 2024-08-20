export const handleDownload = async (zip) => {
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ig.zip';
    a.click();
    URL.revokeObjectURL(url);
};