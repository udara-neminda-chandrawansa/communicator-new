export default function HomePage(){
    return(
        <div className="p-5" style={{display:"flex",flexDirection:"column", justifyContent:"center",minHeight:"90vh",background:"linear-gradient(45deg,var(--com-purple),var(--com-pink))",color:"white"}}>
            <h1>Welcome to UNC Communicator!</h1>
            <p>
                This web-app serves an important part in your data communication tasks through devices such as smart devices, Laptops and Desktop PCs. Simply send files and text through a device to view them later in your other devices. It"s that simple!
            </p>
            <p>Press Login to Start!</p>
        </div>
    );
}