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
    subscription_status VARCHAR(20) DEFAULT 'trial', -- trial, active, past_due, cancelled
    subscription_expires_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: students (Os Alunos)
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trainer_id UUID NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    
    -- NOVO: Upload de Documento (Ficha de Anamnese/Saúde)
    anamnesis_url TEXT,

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

    -- NOVO: Upload de Documento (Dieta da Nutricionista vinculada ao treino)
    diet_plan_url TEXT,

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
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Índices para otimizar as buscas por chaves estrangeiras
CREATE INDEX ON students (trainer_id);
CREATE INDEX ON workouts (student_id);
CREATE INDEX ON workouts (trainer_id);
CREATE INDEX ON workout_exercises (workout_id);
CREATE INDEX ON workout_exercises (exercise_id);
CREATE INDEX ON chat_messages (sender_id, receiver_id);
CREATE INDEX ON chat_messages (created_at DESC);
CREATE INDEX ON announcements (trainer_id);

-- Inserindo dados iniciais na tabela de exercícios
INSERT INTO exercises (name, muscle_group, equipment) VALUES
('Supino Reto com Barra', 'Peito', 'Barra'),
('Supino Inclinado com Halteres', 'Peito', 'Halteres'),
('Supino Declinado com Barra', 'Peito', 'Barra'),
('Crucifixo Reto', 'Peito', 'Halteres'),
('Crucifixo Inclinado', 'Peito', 'Halteres'),
('Flexão de Braço (Push-up)', 'Peito', 'Peso Corporal'),
('Voador (Peck Deck)', 'Peito', 'Máquina'),
('Crossover Polia Alta', 'Peito', 'Polia'),
('Puxada Frontal (Pulley)', 'Costas', 'Polia'),
('Remada Curvada com Barra', 'Costas', 'Barra'),
('Remada Unilateral com Halter (Serrote)', 'Costas', 'Halteres'),
('Remada Sentada (Polia Baixa)', 'Costas', 'Polia'),
('Barra Fixa (Pull-up)', 'Costas', 'Peso Corporal'),
('Levantamento Terra (Deadlift)', 'Costas', 'Barra'),
('Crucifixo Inverso na Máquina', 'Costas', 'Máquina'),
('Agachamento Livre com Barra', 'Pernas', 'Barra'),
('Leg Press 45', 'Pernas', 'Máquina'),
('Afundo com Halteres', 'Pernas', 'Halteres'),
('Cadeira Extensora', 'Pernas', 'Máquina'),
('Mesa Flexora', 'Pernas', 'Máquina'),
('Stiff com Barra', 'Pernas', 'Barra'),
('Elevação Pélvica (Hip Thrust)', 'Pernas', 'Barra'),
('Agachamento Búlgaro', 'Pernas', 'Halteres'),
('Cadeira Adutora', 'Pernas', 'Máquina'),
('Cadeira Abdutora', 'Pernas', 'Máquina'),
('Gêmeos em Pé na Máquina (Smith)', 'Panturrilhas', 'Máquina'),
('Gêmeos Sentado', 'Panturrilhas', 'Máquina'),
('Desenvolvimento Militar com Barra', 'Ombros', 'Barra'),
('Desenvolvimento com Halteres', 'Ombros', 'Halteres'),
('Elevação Lateral com Halteres', 'Ombros', 'Halteres'),
('Elevação Frontal com Halteres', 'Ombros', 'Halteres'),
('Remada Alta', 'Ombros', 'Barra'),
('Crucifixo Inverso com Halteres', 'Ombros', 'Halteres'),
('Rosca Direta com Barra', 'Bíceps', 'Barra'),
('Rosca Alternada com Halteres', 'Bíceps', 'Halteres'),
('Rosca Martelo', 'Bíceps', 'Halteres'),
('Rosca Scott na Máquina', 'Bíceps', 'Máquina'),
('Rosca Concentrada', 'Bíceps', 'Halteres'),
('Tríceps Pulley', 'Tríceps', 'Polia'),
('Tríceps Testa com Barra', 'Tríceps', 'Barra'),
('Tríceps Francês com Halter', 'Tríceps', 'Halteres'),
('Mergulho no Banco', 'Tríceps', 'Peso Corporal'),
('Tríceps Coice com Halter', 'Tríceps', 'Halteres'),
('Abdominal Supra', 'Abdômen', 'Peso Corporal'),
('Abdominal Infra (Elevação de Pernas)', 'Abdômen', 'Peso Corporal'),
('Prancha Abdominal', 'Abdômen', 'Peso Corporal'),
('Abdominal Oblíquo (Bicicleta)', 'Abdômen', 'Peso Corporal');