import {useState} from "react";
import {message} from "antd";

// 自定义hook，抽象一个出输入框，失去焦点和输入回车键时执行业务函数
export function useBlurInput(fn) {
    const [inputVlue, setInputValue] = useState('')

    function handleChange(e) {
        setInputValue(e.target.value)
    }

    function handleBlur() {
        if (inputVlue !== '') {
            fn(inputVlue).then(() => {
                done()
            })
        }
    }

    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            if (inputVlue === '') {
                message.error('输入不能为空')
                return
            }
            fn(inputVlue).then(() => {
                done()
            })
        }
    }

    function done() {
        setInputValue('')
        message.success('操作成功')
    }

    const inputPros = {
        value: inputVlue,
        autoComplete: "off",
        onChange: handleChange,
        onBlur: handleBlur,
        onKeyDown: handleKeyDown,
    }
    return inputPros
}