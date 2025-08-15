const express = require('express');
const cors = require('cors');
const apiRouter = require('./api');
const connection = require('./db');
const app = express();
const PORT = process.env.PORT || 5000;
const bcrypt = require("bcrypt");
const saltRounds = 10; 

app.use(cors());
app.use('/api', apiRouter);
app.use(express.json());    

app.post("/pag/cadastro", (req, res) => {
    const email= req.body.email;
    const nome= req.body.nome;
    const senha= req.body.senha;
    const date= req.body.date;
    const imagem = req.body.color_img;

    connection.query("SELECT * FROM tb_usuario WHERE email = ? ", [email], (err, result) => {
        if(err) {
            res.send(err);
        }
        if(result.length == 0) {
            bcrypt.hash(senha, saltRounds, (erro, hash) => {
                connection.query("INSERT INTO tb_usuario (email, nome, senha, data, cor_perfil) VALUES (?, ?, ?, ?, ?)", [email, nome, hash, date, imagem], (err, response) => {
                    if(err) {
                        res.send(err);
                    }
                    res.send({msg:"cadastrado"});
                });
            })

        } else {
            res.send({msg: "E-mail já cadastrado"});
        }
    });
});

app.post("/pag/login", (req, res) => {
    const email= req.body.email;
    const senha= req.body.senha;

    connection.query("SELECT * FROM tb_usuario WHERE email = ?", [email], (err, result) => {
        if(err){
            res.send(err);
        }    
        if(result.length > 0) {
            bcrypt.compare(senha, result[0].senha, (erro, result) => {
                if(result) { 
                    res.send({msg: "logged"}); 
                } else {
                    res.send({msg: "Senha incorreta"});
                }         
            });
        } else {
            res.send({msg: "E-mail não encontrado"});
        } 
    });
});

app.post("/pag/contato", (req, res) => {
    const nome= req.body.nome;
    const email= req.body.email;
    const texto= req.body.texto;
    const user = req.body.idusuario;

    connection.query("SELECT * FROM tb_usuario WHERE email = ? AND nome = ?", [email, nome], (err, result) => {
        if(err) {
            res.send(err);
        }
        if(result.length > 0) {
            connection.query("INSERT INTO tb_sugestao (id_usuario, texto) VALUES (?, ?)", [user, texto], (err, result) => {
                if(err) {
                    res.send(err);
                } else {
                    res.send({msg: "Mensagem enviada com sucesso!"});
                }                
            });
        } else {
            res.send({msg: "E-mail ou nome não encontrado"});
        }
    });
});

app.post("/pag/comentario", (req, res) => {
    const comentario= req.body.comentario;
    const user = req.body.id_usuario;
    const post = req.body.id_post;
    const date = req.body.date;
    const id_post = req.body.id_post;
    const id_coments = req.body.id_coments;
    const id_comentPost = req.body.id_comentPost;

    if(comentario) {
        connection.query("INSERT INTO tb_comentarios (id_usuario, id_post, texto, data) VALUES (?, ?, ?, ?)", [user, post, comentario, date], (err, result) => {
            if(err) {
                res.send(err);
            } 
        })
    } else if(id_post) {
        try{
            connection.query("DELETE FROM tb_posts WHERE id = ?", [id_post], (err, result) => {
                if(err) {
                    res.send(err);
                } else {
                    res.send({mds: "Post deletado"})
                }
            })
        } catch{
            console.error("Erro ao deletar post:", error);
        } 
    } else if(id_coments) {
        try{
            connection.query("DELETE FROM tb_comentarios WHERE id = ?", [id_coments], (err, result) => {
                if(err) {
                    res.send(err);
                } else {
                    res.send({msg: "Comentario deletado"});
                }
            })
        } catch {
            console.error("Erro ao deletar comentário:", error);
        }
    } else if(id_comentPost) {
        try{
            connection.query("DELETE FROM tb_comentarios WHERE id_post = ?", [id_comentPost], (err, result) => {
                if(err) {
                    res.send(err);
                } 
            })
        } catch {
            console.error("Erro ao deletar comentários do post:", error);
        }
    }
});

app.post("/pag/posts", (req, res) => {
    const post = req.body.post;
    const user = req.body.id_usuario;
    const date = req.body.date;
    const imagem = req.body.imagem.length > 0 ? JSON.stringify(imagem) : null;
    const topico = req.body.topico;
    const del_coment = req.body.del_coment;

        if(post){
            connection.query("INSERT INTO tb_posts (id_usuario, texto, data, imagem, topico) VALUES (?, ?, ?, ?, ?)", [user, post, date, imagem, topico], (err, result) => {
                if(err) {
                    res.send(err);
                } 
            })
        } else if (del_coment) {
            try{
                connection.query("DELETE FROM tb_comentarios WHERE id_post = ?", [del_coment], (err, result) => {
                    if(err) {
                        res.send(err)
                    } 
                })
            } catch{
                console.error("Erro ao deletar comentarios do post:", error);
            } 
        }
})

app.post("/pag/usuario", (req,res) => {
    const novoNome = req.body.novoNome;
    const id = req.body.id;

    if(novoNome){
        connection.query("UPDATE tb_usuario SET nome = ? WHERE id = ?", [novoNome, id],  (err, result) => {
            if(err) {
                res.send(err);
            } else {
                console.log({msg: "Nome alterado com sucesso!"});
            }
        })
    }
    

    const imagem = req.body.imagem;

    if(imagem){
        connection.query("UPDATE tb_usuario SET cor_perfil = ? WHERE id = ?", [imagem, id],  (err, result) => {
            if(err) {
                res.send(err)
            } else {
                console.log("a cor foi alterada")
            }
        })
    }
})

app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
});

