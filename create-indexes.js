const fs = require('fs');
const path = require('path');

// 컴포넌트 이름과 특별히 처리해야 할 컴포넌트 목록
const componentDirs = fs.readdirSync('src/components');
const specialExports = {
  'tabs': ['TabsList', 'TabsTrigger', 'TabsContent'],
  'radio-group': ['RadioItem'],
  'popover': ['PopoverField']
};

componentDirs.forEach(dir => {
  const componentDir = path.join('src/components', dir);
  if (fs.statSync(componentDir).isDirectory()) {
    // 이미 index.ts가 있으면 스킵
    const indexPath = path.join(componentDir, 'index.ts');
    if (fs.existsSync(indexPath)) {
      console.log(`이미 존재함: ${indexPath}`);
      return;
    }
    
    // 컴포넌트 파일 찾기 (폴더명과 같은 이름의 파일 찾기, 첫 글자 대문자로)
    const componentName = dir.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
    const componentFile = path.join(componentDir, `${componentName}.tsx`);
    
    // 컴포넌트 파일이 존재하는지 확인
    if (!fs.existsSync(componentFile)) {
      console.log(`경고: ${componentFile} 파일을 찾을 수 없습니다.`);
      return;
    }
    
    // index.ts 파일 생성
    let indexContent = `import ${componentName}`;
    
    // 특별한 export가 필요한 컴포넌트인지 확인
    const additionalExports = specialExports[dir] || [];
    if (additionalExports.length > 0) {
      indexContent += `, { ${additionalExports.join(', ')} }`;
    }
    
    indexContent += ` from './${componentName}';\n\n`;
    
    // 추가 export 처리
    if (additionalExports.length > 0) {
      indexContent += `export { ${additionalExports.join(', ')} };\n`;
    }
    
    indexContent += `export default ${componentName};`;
    
    // index.ts 파일 쓰기
    fs.writeFileSync(indexPath, indexContent);
    console.log(`생성됨: ${indexPath}`);
  }
}); 