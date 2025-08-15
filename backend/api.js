const express = require('express');
const router = express.Router();
const connection = require('./db');

router.get('/usuario', (req, res) => {
    connection.query('SELECT * FROM tb_usuario', (error, results) => {
        if (error) {
            console.error('Erro ao buscar usuários:', error);
            res.status(500).json({ error });
            return;
        }

        const dados = results.map(usuario => {
            return {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senha,
                data: usuario.data,
                cor_perfil: usuario.cor_perfil,
            };  
        });

        res.json(dados);
    });
});

router.get('/exportar/usuario', (req, res) => {
    connection.query('SELECT * FROM tb_usuario', (error, results) => {
        if (error) {
            console.error('Erro ao exportar usuários:', error);
            res.status(500).json({ error });
            return;
        }

        const csv = results.map(usuario => {
            return {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senha,
                data: usuario.data,
                cor_perfil: usuario.cor_perfil,
            };
        });

        res.header('Content-Type', 'text/csv');
        res.attachment('clientes.csv');
        res.send(csv);
    });
});

router.get('/comentarios', (req, res) => {
    connection.query('SELECT * FROM tb_comentarios', (error, results) => {
        if (error) {
            console.error('Erro ao buscar comentários:', error);
            res.status(500).json({ error });
            return;
        }

        const dados = results.map(comentario => {
            return {
                id: comentario.id,
                id_usuario: comentario.id_usuario,
                id_post: comentario.id_post,
                texto: comentario.texto,
                data: comentario.data,
            };
        });

        res.json(dados);
    });
});

router.get('/exportar/comentarios', (req, res) => {
    connection.query('SELECT * FROM tb_comentarios', (error, results) => {
        if (error) {
            console.error('Erro ao exportar comentários:', error);
            res.status(500).json({ error });
            return;
        }

        const csv = result.map(comentario => {
            return {
                id: comentario.id,
                id_usuario: comentario.id_usuario,
                id_post: comentario.id_post,
                texto: comentario.texto,
                data: comentario.data,
            };
        });

        res.header('Content-Type', 'text/csv');
        res.attachment('clientes.csv');
        res.send(csv);
    });
});

router.get('/posts', (req, res) => {
    connection.query('SELECT * FROM tb_posts', (error, results) => {
        if (error) {
            console.error('Erro ao buscar posts:', error);
            res.status(500).json({ error });
            return;
        }

        const dados = results.map(post => {
            return {
                id: post.id,
                id_usuario: post.id_usuario,
                texto: post.texto,
                data: post.data,
                imagem: post.imagem,
                topico: post.topico,
            };
        });

        res.json(dados);
    });
});

router.get('/exportar/posts', (req, res) => {
    connection.query('SELECT * FROM tb_posts', (error, results) => {
        if (error) {
            console.error('Erro ao exportar posts:', error);
            res.status(500).json({ error });
            return;
        }

        const csv = results.map(post => {
            return {
                id: post.id,
                id_usuario: post.id_usuario,
                texto: post.texto,
                data: post.data,
                imagem: post.imagem,
                topico: post.topico,
            };
        });

        res.header('Content-Type', 'text/csv');
        res.attachment('clientes.csv');
        res.send(csv);
    });
});

router.get('/sugestao', (req, res) => {
    connection.query('SELECT * FROM tb_sugestao', (error, results) => {
        if (error) {
            console.error('Erro ao buscar sugestões:', error);
            res.status(500).json({ error });
            return;
        }

        const dados = results.map(sugestao => {
            return {
                id: sugestao.id,
                id_usuario: sugestao.id_usuario,
                texto: sugestao.texto,
            };
        });

        res.json(dados);
    });
});

router.get('/exportar/sugestao', (req, res) => {
    connection.query('SELECT * FROM tb_sugestao', (error, results) => {
        if (error) {
            console.error('Erro ao exportar sugestões:', error);
            res.status(500).json({ error });
            return;
        }

        const csv = results.map(sugestao => {
            return {
                id: sugestao.id,
                id_usuario: sugestao.id_usuario,
                texto: sugestao.texto,
            };
        });

        res.header('Content-Type', 'text/csv');
        res.attachment('clientes.csv');
        res.send(csv);
    });
});

router.get('/anexos', (req, res) => {
    connection.query('SELECT * FROM tb_anexo', (error, results) => {
        if (error) {
            console.error('Erro ao buscar anexos:', error);
            res.status(500).json({ error });
            return;
        }

        const dados = results.map(anexo => {
            return {
                id: anexo.id,
                id_post: anexo.idPost,
                midia: anexo.midia,
            };
        });

        res.json(dados);
    });
});

router.get('/exportar/anexos', (req, res) => {
    connection.query('SELECT * FROM tb_anexo', (error, results) => {
        if (error) {
            console.error('Erro ao exportar anexos:', error);
            res.status(500).json({ error });
            return;
        }

        const csv = result.map(anexo => {
            return {
                id: anexo.id,
                id_post: anexo.idPost,
                midia: anexo.midia,
            };
        });

        res.header('Content-Type', 'text/csv');
        res.attachment('clientes.csv');
        res.send(csv);
    });
});

router.get('/busca', (req, res) => {
    const busca = req.query.busca;

    connection.query("SELECT * FROM tb_posts WHERE texto LIKE ? ", [`%${busca}%`], (error, results) => {
        if(error) {
            console.error('Erro ao buscar posts:', error);
            res.status(500).json({ error});
            return;
        }

        const dados = results.map(posts => {
            return {
                id: posts.id,
                id_usuario: posts.id_usuario,
                texto: posts.texto,
                data: posts.data,
                imagem: posts.imagem,
                topico: posts.topico,
            };
        });
        res.json(dados);
    });
});

router.get('/exportar/busca', (req, res) => {
    const busca = req.query.busca;

    connection.query("SELECT * FROM tb_posts WHERE texto LIKE ? ", [`%${busca}%`], (error, results) => {
        if (error) {
            console.error('Erro ao exportar posts:', error);
            res.status(500).json({ error });
            return;
        }

        const csv = result.map(posts => {
            return {
                id: posts.id,
                id_usuario: posts.id_usuario,
                texto: posts.texto,
                data: posts.data,
                imagem: posts.imagem,
                topico: posts.topico,
            };
        });

        res.header('Content-Type', 'text/csv');
        res.attachment('clientes.csv');
        res.send(csv);
    });
});

module.exports = router;

