-- Habilita a extensão para gerar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela: trainers (Os Personais / Tenants)
CREATE TABLE trainers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    
    -- Identidade Visual
    brand_logo_url TEXT,
    brand_primary_color VARCHAR(7),
    brand_secondary_color VARCHAR(7) DEFAULT '#000000',

    -- Dados de Pagamento (Para o Aluno ver)
    payment_pix_key TEXT,
    payment_link_url TEXT,
    payment_instructions TEXT,

    -- Status da Assinatura (Controle da Plataforma)
    subscription_status VARCHAR(20) DEFAULT 'trial', 
    subscription_expires_at TIMESTAMPTZ,
    
    -- Termos de Uso
    terms_accepted_at TIMESTAMPTZ,

    -- Recuperação de Senha
    reset_password_token VARCHAR(255),
    reset_password_expires_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: students (Os Alunos)
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trainer_id UUID NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    
    -- Upload de Documento (Ficha de Anamnese/Saúde)
    anamnesis_url TEXT,

    -- Termos de Uso
    terms_accepted_at TIMESTAMPTZ,

    -- Recuperação de Senha
    reset_password_token VARCHAR(255),
    reset_password_expires_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: diets (Planos Alimentares)
CREATE TABLE diets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trainer_id UUID NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    content TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: workouts (Os Treinos)
CREATE TABLE workouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trainer_id UUID NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: exercises (Biblioteca de Exercícios)
CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    muscle_group VARCHAR(100),
    equipment VARCHAR(100),
    video_url TEXT,
    image_url TEXT
);

-- Tabela: workout_exercises (A "Receita" do Treino)
CREATE TABLE workout_exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE RESTRICT,
    
    -- Cache do nome para evitar joins lentos na listagem
    exercise_name VARCHAR(255), 
    
    sets INTEGER,
    reps VARCHAR(50),
    rest_period_seconds INTEGER,
    "order" INTEGER,
    notes TEXT,
    execution_details TEXT
);

-- Tabela: chat_messages (Histórico do Chat Privado)
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL,
    receiver_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: announcements (Mural de Avisos)
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trainer_id UUID NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Índices de Performance
CREATE INDEX ON students (trainer_id);
CREATE INDEX ON diets (trainer_id);
CREATE INDEX ON diets (student_id);
CREATE INDEX ON workouts (student_id);
CREATE INDEX ON workouts (trainer_id);
CREATE INDEX ON workout_exercises (workout_id);
CREATE INDEX ON workout_exercises (exercise_id);
CREATE INDEX ON chat_messages (sender_id, receiver_id);
CREATE INDEX ON chat_messages (created_at DESC);
CREATE INDEX ON announcements (trainer_id);
CREATE INDEX ON exercises (muscle_group); -- Vital para o filtro de categorias
CREATE INDEX ON exercises (name); -- Vital para a busca