import pool from "../db.mjs"

export const getUsers = (_, res) => {
    const q = "SELECT * FROM public.usuario"

    pool.query(q, (err, result) => {
        if (err) {
            console.error("Erro na consulta:", err);
            return res.status(500).json({ message: "Erro ao buscar os dados" });
        }

        if (Array.isArray(result.rows)) {
            return res.status(200).json(result.rows); 
        } else {
            return res.status(500).json({ message: "Dados não encontrados ou formato inesperado" });
        }
    });
}

export const addUser = (req, res) => {
    const q = `
        INSERT INTO usuario (nome, email, fone, data_nascimento)
        VALUES ($1, $2, $3, $4)
    `

    
    const values = [
        req.body.nome,
        req.body.email,
        req.body.fone,
        req.body.data_nascimento,
    ];

    pool.query(q, values, (err) => {
        if (err) {
            console.error("Erro ao inserir dados:", err);
            return res.status(500).json({ message: "Erro ao inserir os dados" });
        }

        return res.status(200).json("Usuário criado com sucesso");
    });
};


export const deleteUser = (req, res)=> {
    const q = "DELETE FROM usuario WHERE `id` = ?"

    pool.query(q, [req.params.id], (err) => {
        if (err) return res.json(err)
        
            return res.status(200).json("Usuario deletado com sucesso")
    })
}

