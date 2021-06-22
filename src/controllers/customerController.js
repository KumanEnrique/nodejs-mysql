const controller = {}

controller.list = (req,res)=>{
    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM customer',(err,customerRows)=>{
            if(err){
                res.json(err)
            }
            // console.log(customerRows)
            res.render('customers',{
                data:customerRows
            })
        })
    })
}
controller.save = (req,res)=>{
    const data = req.body
    req.getConnection((err,conn)=>{
        conn.query('INSERT INTO customer SET ?',[data],(err,customerRows)=>{
            // console.log(customerRows)
            res.redirect('/')
        })
    })
}
controller.delete = (req,res)=>{
    const { id } = req.params
    req.getConnection((err,conn)=>{
        conn.query('DELETE FROM customer WHERE id = ?',[id],(err,customerRows)=>{
            res.redirect('/')
        })
    })
    // res.json('ok')
}
controller.update = (req,res)=>{/*este metodo solo le pasa los datos a actualizar */
    const { id } = req.params
    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM customer WHERE id = ?',[id],(err,customerRows)=>{
            // console.log(customerRows);
            // console.log(customerRows[0]);
            if(err){
                res.json(err)
            }
            res.render('customerEdit',{
                data:customerRows[0]
            })
        })
    })
}
controller.edit = (req,res)=>{/*este metodo actualiza los datos para que se grabe en la bd */
    const { id } = req.params
    const data = req.body
    req.getConnection((err,conn)=>{
        conn.query('UPDATE customer SET ? WHERE id = ?',[data,id],(err,customerRows)=>{
            res.redirect('/')
        })
    })
    // console.log(req.params)
    // res.json('ok')
}

module.exports = controller