-- Habilita a extensão para gerar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela: trainers (Os Personais / Tenants)
CREATE TABLE trainers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    brand_logo_url TEXT,
    brand_primary_color VARCHAR(7),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: students (Os Alunos)
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trainer_id UUID NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
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
    video_url TEXT
);

-- Tabela: workout_exercises (A "Receita" do Treino)
CREATE TABLE workout_exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE RESTRICT, -- Evita apagar exercício da biblioteca se estiver em uso
    sets INTEGER,
    reps VARCHAR(50),
    rest_period_seconds INTEGER,
    "order" INTEGER,
    notes TEXT,
    execution_details TEXT -- O campo diferencial que você sugeriu!
);

-- Índices para otimizar as buscas por chaves estrangeiras
CREATE INDEX ON students (trainer_id);
CREATE INDEX ON workouts (student_id);
CREATE INDEX ON workouts (trainer_id);
CREATE INDEX ON workout_exercises (workout_id);
CREATE INDEX ON workout_exercises (exercise_id);

-- Inserindo dados iniciais na tabela de exercícios
-- Peito
INSERT INTO exercises (name, muscle_group, equipment) VALUES
('Supino Reto com Barra', 'Peito', 'Barra'),
('Supino Inclinado com Halteres', 'Peito', 'Halteres'),
('Supino Declinado com Barra', 'Peito', 'Barra'),
('Crucifixo Reto', 'Peito', 'Halteres'),
('Crucifixo Inclinado', 'Peito', 'Halteres'),
('Flexão de Braço (Push-up)', 'Peito', 'Peso Corporal'),
('Voador (Peck Deck)', 'Peito', 'Máquina'),
('Crossover Polia Alta', 'Peito', 'Polia');

-- Costas
INSERT INTO exercises (name, muscle_group, equipment) VALUES
('Puxada Frontal (Pulley)', 'Costas', 'Polia'),
('Remada Curvada com Barra', 'Costas', 'Barra'),
('Remada Unilateral com Halter (Serrote)', 'Costas', 'Halteres'),
('Remada Sentada (Polia Baixa)', 'Costas', 'Polia'),
('Barra Fixa (Pull-up)', 'Costas', 'Peso Corporal'),
('Levantamento Terra (Deadlift)', 'Costas', 'Barra'),
('Crucifixo Inverso na Máquina', 'Costas', 'Máquina');

-- Pernas (Quadríceps, Isquiotibiais e Glúteos)
INSERT INTO exercises (name, muscle_group, equipment) VALUES
('Agachamento Livre com Barra', 'Pernas', 'Barra'),
('Leg Press 45', 'Pernas', 'Máquina'),
('Afundo com Halteres', 'Pernas', 'Halteres'),
('Cadeira Extensora', 'Pernas', 'Máquina'),
('Mesa Flexora', 'Pernas', 'Máquina'),
('Stiff com Barra', 'Pernas', 'Barra'),
('Elevação Pélvica (Hip Thrust)', 'Pernas', 'Barra'),
('Agachamento Búlgaro', 'Pernas', 'Halteres'),
('Cadeira Adutora', 'Pernas', 'Máquina'),
('Cadeira Abdutora', 'Pernas', 'Máquina');

-- Panturrilhas
INSERT INTO exercises (name, muscle_group, equipment) VALUES
('Gêmeos em Pé na Máquina (Smith)', 'Panturrilhas', 'Máquina'),
('Gêmeos Sentado', 'Panturrilhas', 'Máquina');

-- Ombros
INSERT INTO exercises (name, muscle_group, equipment) VALUES
('Desenvolvimento Militar com Barra', 'Ombros', 'Barra'),
('Desenvolvimento com Halteres', 'Ombros', 'Halteres'),
('Elevação Lateral com Halteres', 'Ombros', 'Halteres'),
('Elevação Frontal com Halteres', 'Ombros', 'Halteres'),
('Remada Alta', 'Ombros', 'Barra'),
('Crucifixo Inverso com Halteres', 'Ombros', 'Halteres');

-- Bíceps
INSERT INTO exercises (name, muscle_group, equipment) VALUES
('Rosca Direta com Barra', 'Bíceps', 'Barra'),
('Rosca Alternada com Halteres', 'Bíceps', 'Halteres'),
('Rosca Martelo', 'Bíceps', 'Halteres'),
('Rosca Scott na Máquina', 'Bíceps', 'Máquina'),
('Rosca Concentrada', 'Bíceps', 'Halteres');

-- Tríceps
INSERT INTO exercises (name, muscle_group, equipment) VALUES
('Tríceps Pulley', 'Tríceps', 'Polia'),
('Tríceps Testa com Barra', 'Tríceps', 'Barra'),
('Tríceps Francês com Halter', 'Tríceps', 'Halteres'),
('Mergulho no Banco', 'Tríceps', 'Peso Corporal'),
('Tríceps Coice com Halter', 'Tríceps', 'Halteres');

-- Abdômen
INSERT INTO exercises (name, muscle_group, equipment) VALUES
('Abdominal Supra', 'Abdômen', 'Peso Corporal'),
('Abdominal Infra (Elevação de Pernas)', 'Abdômen', 'Peso Corporal'),
('Prancha Abdominal', 'Abdômen', 'Peso Corporal'),
('Abdominal Oblíquo (Bicicleta)', 'Abdômen', 'Peso Corporal');

-- Tabela: chat_messages (Histórico do Chat Privado)
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL, -- Pode ser um trainer ou um student
    receiver_id UUID NOT NULL, -- Pode ser um trainer ou um student
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Índices para otimizar a busca de conversas
CREATE INDEX ON chat_messages (sender_id, receiver_id);
CREATE INDEX ON chat_messages (created_at DESC);

-- Tabela: announcements (Mural de Avisos)
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trainer_id UUID NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Índice para otimizar a busca de avisos por trainer
CREATE INDEX ON announcements (trainer_id);