
export default function Layout({ children }:any) {
    return <>
      {children}
      <div className='icp'>
        <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2022046023号-1</a>
      </div>
    </>
}