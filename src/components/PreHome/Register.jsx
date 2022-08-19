export default function RegisterForm() {
    return <form className="register" onSubmit={()=>
        console.log(123)}>
        <input className="text-input" type="text" placeholder="Username" required name="username"/>
        <div style={{opacity: 0.5}}>只能由字母、数字和下划线组成，且必须由字母或数字开头，长度最少1位最多10位</div>
        <input className="text-input" type="password" placeholder="Password" required
               name="password"/>
        <div style={{opacity: 0.5}}>长度为8-16位字符，只能包含如下特殊字符：-_.</div>
        <button className="text-input login-btn">REGISTER NOW</button>
    </form>
}

