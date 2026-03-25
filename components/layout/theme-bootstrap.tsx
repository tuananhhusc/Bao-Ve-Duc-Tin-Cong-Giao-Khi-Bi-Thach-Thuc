/** Inline script: áp dụng data-theme trước paint để tránh nháy màu */
export function ThemeBootstrapScript() {
  const code = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="sepia")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
