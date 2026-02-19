-- Carga inicial de exercícios do iai-DŌ

                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Assisted Flexão With Resistance Band', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/assisted-push-up-with-resistance-band.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Assisted Flexão With Resistance Band');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Supino Lateral View', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/barbell-bench-press-side-view.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Supino Lateral View');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Supino', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/barbell-bench-press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Supino');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Declinado Supino', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/barbell-decline-bench-press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Declinado Supino');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Pullover', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/barbell-pullover.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Pullover');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Supino Feet Up', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/bench-press-feet-up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Supino Feet Up');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Cross Over (1)', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/cable-cross-over_(1).mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Cross Over (1)');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Cross Over', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/cable-cross-over.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Cross Over');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Fly', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/cable-fly.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Fly');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Chest Dips', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/chest_dips.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Chest Dips');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Chest Desenvolvimento Sentado', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/chest_press_sentado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Chest Desenvolvimento Sentado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Chest Desenvolvimento Máquina', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/chest-press-machine.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Chest Desenvolvimento Máquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Clapping Push Ups', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/clapping-push-ups.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Clapping Push Ups');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Crossover Inclinado', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/crossover_inclinado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Crossover Inclinado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Crossover', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/crossover.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Crossover');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Crucifixo Declindo Polia Baixa', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/crucifixo_declindo_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Crucifixo Declindo Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Crucifixo Inclinado Com Halteres', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/crucifixo_inclinado_com_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Crucifixo Inclinado Com Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Crucifixo Polia Baixa', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/crucifixo_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Crucifixo Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Crucifixo', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/crucifixo.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Crucifixo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cruzamento Peito Unilateral', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/cruzamento_peito_unilateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cruzamento Peito Unilateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cruzamento Peito', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/cruzamento_peito.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cruzamento Peito');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cruzamento Polia Alta', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/cruzamento_polia_alta.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cruzamento Polia Alta');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cruzamento Polia Baixa', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/cruzamento_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cruzamento Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Declinado Cabo Fly', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/decline-cable-fly.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Declinado Cabo Fly');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Declinado Flexão', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/decline-push-up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Declinado Flexão');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Deficit Push Ups', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/deficit-push-ups.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Deficit Push Ups');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Chest Fly Muscles', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/dumbbell-chest-fly-muscles.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Chest Fly Muscles');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Chest Desenvolvimento', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/dumbbell-chest-press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Chest Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Floor Desenvolvimento', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/dumbbell-floor-press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Floor Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Hex Desenvolvimento', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/dumbbell-hex-press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Hex Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Unilateral Chest Desenvolvimento', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/dumbbell-one-arm-chest-press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Unilateral Chest Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Pullover', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/dumbbell-pullover.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Pullover');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Svend Desenvolvimento', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/dumbbell-svend-press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Svend Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Apoiado', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/flexão_apoiado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Apoiado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Incliando', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/flexão_incliando.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Incliando');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Na Parede', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/flexão_na_parede.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Na Parede');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Profunda', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/flexão_profunda.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Profunda');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Handstand Pushup', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/handstand-pushup.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Handstand Pushup');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'High Cabo Fly', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/high-cable-fly.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'High Cabo Fly');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Inclinado No Smith', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/inclinado_no_smith.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Inclinado No Smith');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Inclinado Barra Supino', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/incline-barbell-bench-press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Inclinado Barra Supino');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Inclinado Cabo Fly', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/incline-cable-fly.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Inclinado Cabo Fly');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Inclinado Flexão Bench', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/incline-push-up-bench.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Inclinado Flexão Bench');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Inverted Remada', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/inverted-row.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Inverted Remada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Kettlebell Pullover', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/kettlebell-pullover.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Kettlebell Pullover');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Knee Push Ups', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/knee-push-ups.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Knee Push Ups');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Lever Pullover Máquina', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/lever-pullover-machine.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Lever Pullover Máquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Linha Invertida', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/linha_invertida.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Linha Invertida');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Low Cabo Chest Flys', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/low-cable-chest-flys.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Low Cabo Chest Flys');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Mergulho Peitoral', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/mergulho_peitoral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Mergulho Peitoral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Máquina Prensa Peito', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/máquina_prensa_peito.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Máquina Prensa Peito');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Unilateral Halter Fly', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/one-arm-dumbbell-fly.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Unilateral Halter Fly');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Pec Deck Máquina Movement', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/pec-deck-machine-movement.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Pec Deck Máquina Movement');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Pike Flexão', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/pike-push-up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Pike Flexão');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Plyometric Push Ups', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/plyometric-push-ups.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Plyometric Push Ups');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Prensa Inclinado', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/prensa_inclinado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Prensa Inclinado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Prensa Peito Inclinado', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/prensa_peito_inclinado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Prensa Peito Inclinado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Prensa Peito Reto', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/prensa_peito_reto.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Prensa Peito Reto');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Prensa Peito Unilateral', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/prensa_peito_unilateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Prensa Peito Unilateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Desenvolvimento De Halteres Fechado', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/press_de_halteres_fechado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Desenvolvimento De Halteres Fechado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Pronated Grip Cabo Fly', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/pronated-grip-cable-fly.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Pronated Grip Cabo Fly');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Pull Over No Banco', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/pull_over_no_banco.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Pull Over No Banco');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Pullover Na Bola', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/pullover_na_bola.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Pullover Na Bola');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Bars', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/push-up-bars.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Bars');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Reto No Smith', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/reto_no_smith.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Reto No Smith');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Supino Alternado Com Halteres', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/supino_alternado_com_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Supino Alternado Com Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Supino Com Halteres', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/supino_com_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Supino Com Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Supino Declinado No Smith', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/supino_declinado_no_smith.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Supino Declinado No Smith');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Supino Declinado', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/supino_declinado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Supino Declinado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Supino Inclinado Com Halteres', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/supino_inclinado_com_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Supino Inclinado Com Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Supino Inclinado', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/supino_inclinado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Supino Inclinado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Supino Reto', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/supino_reto.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Supino Reto');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Svend Desenvolvimento', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/svend_press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Svend Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Svend Desenvolvimento', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/svend-press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Svend Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Voador Aberto', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/voador_aberto.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Voador Aberto');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Vôo Com Hateres', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/vôo_com_hateres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Vôo Com Hateres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Wall Push Ups', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/wall-push-ups.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Wall Push Ups');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Weighted Dips', 'Peito', 'https://cdn.metsuke.app.br/exercises/peito/weighted-dips.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Weighted Dips');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Band Pushdown', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/band-pushdown.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Band Pushdown');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bench Dips On Floor', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/bench-dips-on-floor.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bench Dips On Floor');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bench Tricep Dips', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/bench-tricep-dips.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bench Tricep Dips');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Lying Tricep Extensão', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/cable-lying-tricep-extension.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Lying Tricep Extensão');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Tricep Kickback', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/cable-tricep-kickback.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Tricep Kickback');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Tricep Overhead Extensions', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/cable-tricep-overhead-extensions.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Tricep Overhead Extensions');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Tricep Pushdown', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/cable-tricep-pushdown.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Tricep Pushdown');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Close Grip Supino Movement', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/close-grip-bench-press-movement.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Close Grip Supino Movement');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Coice Curvado', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/coice_curvado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Coice Curvado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Corda Polia Alta', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/corda_polia_alta.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Corda Polia Alta');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Diamond Pushup', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/diamond-pushup.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Diamond Pushup');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Tricep Kickback', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/dumbbell-tricep-kickback.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Tricep Kickback');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Ez Bar Tricep Pushdown', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/ez-bar-tricep-pushdown.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Ez Bar Tricep Pushdown');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Francesa Dumbell', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/francesa_dumbell.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Francesa Dumbell');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Handstand Flexão', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/handstand-push-up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Handstand Flexão');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Kickback', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/kickback.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Kickback');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Mergulho Assistido', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/mergulho_assistido.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Mergulho Assistido');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Overhead Cabo Tricep Extensão', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/overhead-cable-tricep-extension.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Overhead Cabo Tricep Extensão');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Sphinx Flexão', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/sphinx-push-up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Sphinx Flexão');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Straight Bar Pushdown', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/straight-bar-pushdown.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Straight Bar Pushdown');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Straight Bar Tricep Pushdown', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/straight-bar-tricep-pushdown.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Straight Bar Tricep Pushdown');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Testa Barra Reta', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/testa_barra_reta.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Testa Barra Reta');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Testa Com Halteres', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/testa_com_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Testa Com Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Testa Fechado', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/testa_fechado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Testa Fechado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Testa Unilateral Dumbell', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/testa_unilateral_dumbell.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Testa Unilateral Dumbell');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tricep Overhead Extensions', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tricep-overhead-extensions.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tricep Overhead Extensions');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps 2 Bancos', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_2_bancos.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps 2 Bancos');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Banco De Apoio', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_banco_de_apoio.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Banco De Apoio');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Barra W Em Pé', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_barra_w_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Barra W Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Base', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_base.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Base');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Chão', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_chão.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Chão');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Concentrado', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_concentrado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Concentrado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Corda Polia Baixa', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_corda_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Corda Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Corda', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_corda.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Corda');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Extensão Na Polia', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_extensão_na_polia.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Extensão Na Polia');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Extensão Sentado', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_extensão_sentado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Extensão Sentado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Francês Polia Baixaa', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_francês_polia_baixaa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Francês Polia Baixaa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Inclinado Com Halteres', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_inclinado_com_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Inclinado Com Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Inclinado Dumbell', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_inclinado_dumbell.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Inclinado Dumbell');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Inclinado Extensão', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_inclinado_extensão.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Inclinado Extensão');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Inclinado Polia Baixa', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_inclinado_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Inclinado Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Máquina', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_machine.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Máquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Mergulho', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_mergulho.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Mergulho');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Máquina', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_máquina.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Máquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Na Paralela', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_na_paralela.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Na Paralela');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps No Banco', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_no_banco.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps No Banco');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Patada', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_patada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Patada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Polia Baixa Unilateral', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_polia_baixa_unilateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Polia Baixa Unilateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Reto Dumbell', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_reto_dumbell.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Reto Dumbell');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Reverso Polia Alta', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_reverso_polia_alta.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Reverso Polia Alta');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Reverso', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_reverso.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Reverso');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Roldana Média', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_roldana_média.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Roldana Média');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Testa Com Halteres', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_testa_com_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Testa Com Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Testa Reverso', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_testa_reverso.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Testa Reverso');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Testa Roldana', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_testa_roldana.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Testa Roldana');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Unilateral Polia Frente', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_unilateral_polia_frente.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Unilateral Polia Frente');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Unilateral Reverso', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_unilateral_reverso.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Unilateral Reverso');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps Unilateral', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_unilateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps Unilateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tríceps V', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/tríceps_v.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tríceps V');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Unilateral Sentado', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/unilateral_sentado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Unilateral Sentado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'V Bar Tricep Pushdown', 'Tríceps', 'https://cdn.metsuke.app.br/exercises/tríceps/v-bar-tricep-pushdown.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'V Bar Tricep Pushdown');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Band Pull', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/band_pull.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Band Pull');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Delt Fly', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/cabo_delt_fly.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Delt Fly');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Reverso', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/cabo_reverso.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Reverso');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Corda De Remo', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/corda_de_remo.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Corda De Remo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Decúbito Inclinado', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/decúbito_inclinado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Decúbito Inclinado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação Em Y', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/elevação_em_y.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação Em Y');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação Lateral Inclinada', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/elevação_lateral_inclinada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação Lateral Inclinada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Encolher Com Barra', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/encolher_com_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Encolher Com Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Encolhimento Alavanca', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/encolhimento_alavanca.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Encolhimento Alavanca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Encolhimento Com Halteres', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/encolhimento_com_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Encolhimento Com Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Encolhimento De Ombros Pela Frente', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/encolhimento_de_ombros_pela_frente.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Encolhimento De Ombros Pela Frente');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Encolhimento De Ombros Por Trás', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/encolhimento_de_ombros_por_trás.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Encolhimento De Ombros Por Trás');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Encolhimento Inclinado', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/encolhimento_inclinado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Encolhimento Inclinado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Encolhimento Na Polia Baixa', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/encolhimento_na_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Encolhimento Na Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Polia Alta', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/polia_alta.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Polia Alta');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Alta Na W', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/remada_alta_na_w.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Alta Na W');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Em Pé Com Halteres', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/remada_em_pé_com_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Em Pé Com Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Inclinada', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/remada_inclinada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Inclinada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Vertical', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/remada_vertical.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Vertical');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Serratil Na Parede Com Rolo', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/serratil_na_parede_com_rolo.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Serratil Na Parede Com Rolo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Voador Inverso', 'Trapézio', 'https://cdn.metsuke.app.br/exercises/trapézio/voador_inverso.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Voador Inverso');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '1', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/1.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '1');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '10', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/10.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '10');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '11', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/11.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '11');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '12', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/12.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '12');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '13', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/13.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '13');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '14', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/14.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '14');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '15', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/15.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '15');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '16', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/16.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '16');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '17', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/17.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '17');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '18', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/18.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '18');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '19', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/19.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '19');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '2', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/2.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '2');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '20', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/20.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '20');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '21', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/21.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '21');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '22', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/22.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '22');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '23', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/23.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '23');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '24', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/24.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '24');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '25', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/25.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '25');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '26', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/26.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '26');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '27', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/27.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '27');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '28', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/28.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '28');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '29', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/29.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '29');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '3', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/3.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '3');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '30', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/30.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '30');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '31', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/31.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '31');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '32', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/32.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '32');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '33', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/33.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '33');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '34', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/34.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '34');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '35', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/35.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '35');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '36', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/36.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '36');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '37', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/37.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '37');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '38', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/38.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '38');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '39', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/39.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '39');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '4', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/4.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '4');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '40', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/40.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '40');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '41', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/41.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '41');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '42', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/42.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '42');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '43', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/43.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '43');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '44', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/44.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '44');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '45', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/45.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '45');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '46', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/46.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '46');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '47', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/47.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '47');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '48', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/48.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '48');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '5', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/5.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '5');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '6', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/6.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '6');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '7', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/7.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '7');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '8', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/8.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '8');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '9', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/9.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '9');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Hundstund Flexão', 'Todo corpo', 'https://cdn.metsuke.app.br/exercises/todo corpo/hundstund_push_up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Hundstund Flexão');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamente De Rotação', 'Pescoço', 'https://cdn.metsuke.app.br/exercises/pescoço/alongamente_de_rotação.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamente De Rotação');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Abdominal', 'Pescoço', 'https://cdn.metsuke.app.br/exercises/pescoço/alongamento_abdominal.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Abdominal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento De Pescoço Ajoelhado', 'Pescoço', 'https://cdn.metsuke.app.br/exercises/pescoço/alongamento_de_pescoço_ajoelhado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento De Pescoço Ajoelhado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento De Pescoço Frontal E Dorsal', 'Pescoço', 'https://cdn.metsuke.app.br/exercises/pescoço/alongamento_de_pescoço_frontal_e_dorsal.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento De Pescoço Frontal E Dorsal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Esfinge', 'Pescoço', 'https://cdn.metsuke.app.br/exercises/pescoço/alongamento_esfinge.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Esfinge');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Lateral', 'Pescoço', 'https://cdn.metsuke.app.br/exercises/pescoço/alongamento_lateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Lateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Encolimento De Ombros Unilateral', 'Pescoço', 'https://cdn.metsuke.app.br/exercises/pescoço/encolimento_de_ombros_unilateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Encolimento De Ombros Unilateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Extensão  Cervical', 'Pescoço', 'https://cdn.metsuke.app.br/exercises/pescoço/extensão__cervical.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Extensão  Cervical');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Extensão De Pescoço Alavanca', 'Pescoço', 'https://cdn.metsuke.app.br/exercises/pescoço/extensão_de_pescoço_alavanca.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Extensão De Pescoço Alavanca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Extensão De Pescoço Deitado', 'Pescoço', 'https://cdn.metsuke.app.br/exercises/pescoço/extensão_de_pescoço_deitado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Extensão De Pescoço Deitado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Extensão De Pescoço Na Polia', 'Pescoço', 'https://cdn.metsuke.app.br/exercises/pescoço/extensão_de_pescoço_na_polia.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Extensão De Pescoço Na Polia');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão De Pescoço Na Polia', 'Pescoço', 'https://cdn.metsuke.app.br/exercises/pescoço/flexão_de_pescoço_na_polia.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão De Pescoço Na Polia');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão E Pescoço Deitado', 'Pescoço', 'https://cdn.metsuke.app.br/exercises/pescoço/flexão_e_pescoço_deitado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão E Pescoço Deitado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Hiperextensão  No Solo', 'Pescoço', 'https://cdn.metsuke.app.br/exercises/pescoço/hiperextensão__no_solo.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Hiperextensão  No Solo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Pose Peixe', 'Pescoço', 'https://cdn.metsuke.app.br/exercises/pescoço/pose_peixe.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Pose Peixe');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Queixo Tuck', 'Pescoço', 'https://cdn.metsuke.app.br/exercises/pescoço/queixo_tuck.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Queixo Tuck');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Super Homem', 'Pescoço', 'https://cdn.metsuke.app.br/exercises/pescoço/super_homem.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Super Homem');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '1. O Agachamento Convencional Com Halteres', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/1._o_agachamento_convencional_com_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '1. O Agachamento Convencional Com Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '2. Agachamento Frontal Com Halteres', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/2._agachamento_frontal_com_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '2. Agachamento Frontal Com Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '3. Agachamento Sumô Com Halteres', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/3._agachamento_sumô_com_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '3. Agachamento Sumô Com Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '4. Agachamento Dividido Com Halteres', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/4._agachamento_dividido_com_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '4. Agachamento Dividido Com Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '5. O Agachamento Cálice', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/5._o_agachamento_cálice.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '5. O Agachamento Cálice');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '6. O Agachamento Búlgaro Com Halteres', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/6._o_agachamento_búlgaro_com_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '6. O Agachamento Búlgaro Com Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Afundo', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/afundo.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Afundo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Band Pull Through', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/band-pull-through.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Band Pull Through');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Clean And Desenvolvimento Muscles', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/barbell-clean-and-press-muscles.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Clean And Desenvolvimento Muscles');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Levantamento Terra Frontal View', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/barbell-deadlift-front-view.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Levantamento Terra Frontal View');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Levantamento Terra Mixed Grip', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/barbell-deadlift-mixed-grip.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Levantamento Terra Mixed Grip');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Levantamento Terra Movement', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/barbell-deadlift-movement.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Levantamento Terra Movement');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Full Agachamento', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/barbell-full-squat.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Full Agachamento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Hack Agachamento', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/barbell-hack-squat.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Hack Agachamento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Romanian Levantamento Terra Movement', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/barbell-romanian-deadlift-movement.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Romanian Levantamento Terra Movement');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Single Leg Levantamento Terra', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/barbell-single-leg-deadlift.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Single Leg Levantamento Terra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Split Agachamento', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/barbell-split-squat.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Split Agachamento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Sumo Agachamento', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/barbell-sumo-squat.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Sumo Agachamento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Belt Agachamento Between Boxes', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/belt-squat-between-boxes.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Belt Agachamento Between Boxes');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Belt Agachamento', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/belt-squat.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Belt Agachamento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bodyweight Forward Afundo', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/bodyweight-forward-lunge.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bodyweight Forward Afundo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bodyweight Agachamento', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/bodyweight-squat.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bodyweight Agachamento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bodyweight Walking Afundo Movement', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/bodyweight-walking-lunge-movement.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bodyweight Walking Afundo Movement');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Box Agachamento Muscles Used', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/box-squat-muscles-used.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Box Agachamento Muscles Used');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bulgarian Split Spuat', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/bulgarian-split-spuat.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bulgarian Split Spuat');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Curtsy Afundo', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/curtsy-lunge.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Curtsy Afundo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Levantamento Terra Back View', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/deadlift-back-view.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Levantamento Terra Back View');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Levantamento Terra Neutral Grip', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/dumbbell-deadlift-neutral-grip.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Levantamento Terra Neutral Grip');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Swings', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/dumbbell-swings.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Swings');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Frontal Agachamento', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/front-squat.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Frontal Agachamento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Full Agachamento Lateral View', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/full-squat-side-view.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Full Agachamento Lateral View');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Hack Agachamento Musculature', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/hack-squat-musculature.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Hack Agachamento Musculature');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Hex Bar Levantamento Terra', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/hex-bar-deadlift.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Hex Bar Levantamento Terra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'How To Do A Kettlebell Single Arm Swing', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/how-to-do-a-kettlebell-single-arm-swing.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'How To Do A Kettlebell Single Arm Swing');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Kettlebell Sumo Levantamento Terra', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/kettlebell-sumo-deadlift.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Kettlebell Sumo Levantamento Terra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Landmine Levantamento Terra', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/landmine-deadlift.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Landmine Levantamento Terra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Landmine Agachamento', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/landmine-squat.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Landmine Agachamento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Mountain Climbers', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/mountain-climbers.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Mountain Climbers');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Pendulum Afundo', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/pendulum-lunge.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Pendulum Afundo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Pistol Agachamento', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/pistol_squat.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Pistol Agachamento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Pistol Agachamento Muscles', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/pistol-squat-muscles.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Pistol Agachamento Muscles');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Power Afundo Movement', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/power-lunge-movement.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Power Afundo Movement');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Push Desenvolvimento', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/push-press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Push Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Reverse Hack Agachamento', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/reverse-hack-squat.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Reverse Hack Agachamento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Reverse Afundo', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/reverse-lunge.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Reverse Afundo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Lateral Afundo', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/side-lunge.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Lateral Afundo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Smith Máquina Levantamento Terra', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/smith-machine-deadlift.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Smith Máquina Levantamento Terra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Smith Máquina Agachamento Benefits', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/smith-machine-squat-benefits.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Smith Máquina Agachamento Benefits');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Agachamento Jump', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/squat-jump.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Agachamento Jump');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Stiff Legged Smith Levantamento Terra', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/stiff-legged-smith-deadlift.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Stiff Legged Smith Levantamento Terra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Straight Leg Levantamento Terra', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/straight-leg-deadlift.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Straight Leg Levantamento Terra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Suitcase Levantamento Terra', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/suitcase-deadlift.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Suitcase Levantamento Terra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Sumo Levantamento Terra Form', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/sumo-deadlift-form.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Sumo Levantamento Terra Form');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Sumo Smith Máquina Levantamento Terra', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/sumo-smith-machine-deadlift.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Sumo Smith Máquina Levantamento Terra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Sumô Dumbell', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/sumô_dumbell.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Sumô Dumbell');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Trenó', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/trenó.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Trenó');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'V Agachamento', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/v-squat.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'V Agachamento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Weighted Step Up', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/weighted-step-up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Weighted Step Up');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Zercher Agachamento', 'Agachamentos', 'https://cdn.metsuke.app.br/exercises/agachamentos/zercher-squat.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Zercher Agachamento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Hang Clean Weightlifts', 'Cross', 'https://cdn.metsuke.app.br/exercises/cross/barbell_hang_clean_weightlifts.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Hang Clean Weightlifts');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Battle Ropes Exercise', 'Cross', 'https://cdn.metsuke.app.br/exercises/cross/battle-ropes-exercise.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Battle Ropes Exercise');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Box Jump', 'Cross', 'https://cdn.metsuke.app.br/exercises/cross/box-jump.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Box Jump');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Boxing Muscles', 'Cross', 'https://cdn.metsuke.app.br/exercises/cross/boxing-muscles.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Boxing Muscles');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'How To Do A Kettlebell Figure 8', 'Cross', 'https://cdn.metsuke.app.br/exercises/cross/how-to-do-a-kettlebell-figure-8.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'How To Do A Kettlebell Figure 8');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Jump Rope Without Rope', 'Cross', 'https://cdn.metsuke.app.br/exercises/cross/jump-rope-without-rope.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Jump Rope Without Rope');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Jump Rope', 'Cross', 'https://cdn.metsuke.app.br/exercises/cross/jump-rope.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Jump Rope');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Jumping Jack', 'Cross', 'https://cdn.metsuke.app.br/exercises/cross/jumping_jack.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Jumping Jack');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Monkey Bars', 'Cross', 'https://cdn.metsuke.app.br/exercises/cross/monkey-bars.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Monkey Bars');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Mountain Climbers (1)', 'Cross', 'https://cdn.metsuke.app.br/exercises/cross/mountain-climbers_(1).mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Mountain Climbers (1)');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Mountain Climbers', 'Cross', 'https://cdn.metsuke.app.br/exercises/cross/mountain-climbers.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Mountain Climbers');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Muscle Ups Movement', 'Cross', 'https://cdn.metsuke.app.br/exercises/cross/muscle-ups-movement.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Muscle Ups Movement');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rope Climb', 'Cross', 'https://cdn.metsuke.app.br/exercises/cross/rope-climb.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rope Climb');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Salto No Caixote', 'Cross', 'https://cdn.metsuke.app.br/exercises/cross/salto_no_caixote.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Salto No Caixote');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Sled Drag', 'Cross', 'https://cdn.metsuke.app.br/exercises/cross/sled-drag.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Sled Drag');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Agachamento Jump', 'Cross', 'https://cdn.metsuke.app.br/exercises/cross/squat-jump.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Agachamento Jump');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tire Flip', 'Cross', 'https://cdn.metsuke.app.br/exercises/cross/tire-flip.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tire Flip');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Trenó', 'Cross', 'https://cdn.metsuke.app.br/exercises/cross/trenó.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Trenó');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tuck Jump', 'Cross', 'https://cdn.metsuke.app.br/exercises/cross/tuck-jump.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tuck Jump');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Assisted Dip', 'Paralelas', 'https://cdn.metsuke.app.br/exercises/paralelas/assisted-dip.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Assisted Dip');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bench Dips On Floor', 'Paralelas', 'https://cdn.metsuke.app.br/exercises/paralelas/bench-dips-on-floor.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bench Dips On Floor');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Korean Dips', 'Paralelas', 'https://cdn.metsuke.app.br/exercises/paralelas/korean-dips.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Korean Dips');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Parallel Bar Dips', 'Paralelas', 'https://cdn.metsuke.app.br/exercises/paralelas/parallel-bar-dips.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Parallel Bar Dips');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Planche Dip', 'Paralelas', 'https://cdn.metsuke.app.br/exercises/paralelas/planche-dip.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Planche Dip');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Ring Dip', 'Paralelas', 'https://cdn.metsuke.app.br/exercises/paralelas/ring-dip.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Ring Dip');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Straight Bar Dips Muscles', 'Paralelas', 'https://cdn.metsuke.app.br/exercises/paralelas/straight-bar-dips-muscles.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Straight Bar Dips Muscles');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Abraços Nos Joelhos Em Pé', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/abraços_nos_joelhos_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Abraços Nos Joelhos Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Adução De Pernas (Alongamento Do Adutor Maior)', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/adução_de_pernas_(alongamento_do_adutor_maior).mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Adução De Pernas (Alongamento Do Adutor Maior)');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Adução Quadril Deitado De Lado', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/adução_quadril_deitado_de_lado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Adução Quadril Deitado De Lado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Abraço Com Tapinhas Nas Costas', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_abraço_com_tapinhas_nas_costas.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Abraço Com Tapinhas Nas Costas');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Adutores Com A Perna Estendida Ajoelhado', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_adutores_com_a_perna_estendida_ajoelhado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Adutores Com A Perna Estendida Ajoelhado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Adutores Com Pernas Abertas Em Pé', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_adutores_com_pernas_abertas_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Adutores Com Pernas Abertas Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Adutores Com Pernas Afastadas Em Pé', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_adutores_com_pernas_afastadas_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Adutores Com Pernas Afastadas Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Adutores Da Coxa Com Rolo De Espuma', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_adutores_da_coxa_com_rolo_de_espuma.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Adutores Da Coxa Com Rolo De Espuma');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Adutores Em Posição Sentada Com Pernas Abertas', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_adutores_em_posição_sentada_com_pernas_abertas.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Adutores Em Posição Sentada Com Pernas Abertas');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Adutores Sentado', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_adutores_sentado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Adutores Sentado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Assistido Reverso (Peitoral E Ombro)', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_assistido_reverso_(peitoral_e_ombro).mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Assistido Reverso (Peitoral E Ombro)');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Borboleta', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_borboleta.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Borboleta');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Com Pvc Na Posição Frontal De Rack', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_com_pvc_na_posição_frontal_de_rack.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Com Pvc Na Posição Frontal De Rack');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Costas Com Rolo De Espuma', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_costas_com_rolo_de_espuma.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Costas Com Rolo De Espuma');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Círculos Nos Punhos', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_círculos_nos_punhos.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Círculos Nos Punhos');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Da Esfinge', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_da_esfinge.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Da Esfinge');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento De Quadril ', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_de_quadril_.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento De Quadril ');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento De Rotação Da Coluna Em Pé', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_de_rotação_da_coluna_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento De Rotação Da Coluna Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Desviador Ulnar E Extensor Do Punho', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_desviador_ulnar_e_extensor_do_punho.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Desviador Ulnar E Extensor Do Punho');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Dinâmico Do Peitoral', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_dinâmico_do_peitoral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Dinâmico Do Peitoral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Do Piriforme Sentado', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_do_piriforme_sentado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Do Piriforme Sentado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Dos Latíssimos Dorsais Com Rolo De Espuma', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_dos_latíssimos_dorsais_com_rolo_de_espuma.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Dos Latíssimos Dorsais Com Rolo De Espuma');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Em Pé Quadríceps', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_em_pé_quadríceps.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Em Pé Quadríceps');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Extensores Dos Dedos Dos Pés', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_extensores_dos_dedos_dos_pés.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Extensores Dos Dedos Dos Pés');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Flexores De Quadril Ajoelhado', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_flexores_de_quadril_ajoelhado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Flexores De Quadril Ajoelhado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Flexores Do Quadril Em Posição De Joelho', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_flexores_do_quadril_em_posição_de_joelho.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Flexores Do Quadril Em Posição De Joelho');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Flexores Dos Dedos Dos Pés Em Pé', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_flexores_dos_dedos_dos_pés_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Flexores Dos Dedos Dos Pés Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Gastrocnêmio Com Joelho Flexionado', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_gastrocnêmio_com_joelho_flexionado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Gastrocnêmio Com Joelho Flexionado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Glúteos Deitado', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_glúteos_deitado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Glúteos Deitado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Inclinado Lateral Em Pé', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_inclinado_lateral_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Inclinado Lateral Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Isquiotibiais Deitado', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_isquiotibiais_deitado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Isquiotibiais Deitado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Isquiotibiais Em Pé Com A Perna Cruzada', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_isquiotibiais_em_pé_com_a_perna_cruzada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Isquiotibiais Em Pé Com A Perna Cruzada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Isquiotibiais Em Pé(1)', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_isquiotibiais_em_pé(1).mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Isquiotibiais Em Pé(1)');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Isquiotibiais Em Pé', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_isquiotibiais_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Isquiotibiais Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Isquiotibiais Sentado', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_isquiotibiais_sentado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Isquiotibiais Sentado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Lateral Parte Interna Da Coxa', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_lateral_parte_interna_da_coxa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Lateral Parte Interna Da Coxa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Manguito Rotador', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_manguito_rotador.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Manguito Rotador');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Ombro Braço Cruzado', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_ombro_braço_cruzado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Ombro Braço Cruzado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Ombro Com Toalha', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_ombro_com_toalha.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Ombro Com Toalha');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Ombro Reverso Em Pé', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_ombro_reverso_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Ombro Reverso Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Ombros Por Trás Das Costas', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_ombros_por_trás_das_costas.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Ombros Por Trás Das Costas');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Panturrilha Agachado', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_panturrilha_agachado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Panturrilha Agachado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Panturrilha Com Corda', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_panturrilha_com_corda.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Panturrilha Com Corda');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Panturrilha Com Descida Do Calcanhar', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_panturrilha_com_descida_do_calcanhar.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Panturrilha Com Descida Do Calcanhar');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Panturrilha Com Uma Perna Esticada', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_panturrilha_com_uma_perna_esticada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Panturrilha Com Uma Perna Esticada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Panturrilha Com Uma Perna', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_panturrilha_com_uma_perna.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Panturrilha Com Uma Perna');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Panturrilha Em Passo Largo', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_panturrilha_em_passo_largo.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Panturrilha Em Passo Largo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Panturrilha Em Posição Estática', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_panturrilha_em_posição_estática.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Panturrilha Em Posição Estática');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Panturrilha Na Parede', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_panturrilha_na_parede.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Panturrilha Na Parede');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Parede Do Canto', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_parede_do_canto.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Parede Do Canto');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Parte Superior Das Costas', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_parte_superior_das_costas.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Parte Superior Das Costas');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Peito Acima Da Cabeça', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_peito_acima_da_cabeça.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Peito Acima Da Cabeça');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Peito Com Rolo De Espuma', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_peito_com_rolo_de_espuma.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Peito Com Rolo De Espuma');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Peito E Parte Frontal Dos Ombros', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_peito_e_parte_frontal_dos_ombros.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Peito E Parte Frontal Dos Ombros');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Peitoral Até As Costas', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_peitoral_até_as_costas.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Peitoral Até As Costas');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Peitoral Com Um Braço Em Pé', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_peitoral_com_um_braço_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Peitoral Com Um Braço Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Peitoral E Do Ombro Na Porta', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_peitoral_e_do_ombro_na_porta.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Peitoral E Do Ombro Na Porta');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Peitoral Reverso', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_peitoral_reverso.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Peitoral Reverso');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Pernas Duplo', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_pernas_duplo.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Pernas Duplo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Piriforme', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_piriforme.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Piriforme');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Punho', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_punho.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Punho');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Quadríceps Ajoelhado', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_quadríceps_ajoelhado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Quadríceps Ajoelhado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Quadríceps Em Quatro Apoios', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_quadríceps_em_quatro_apoios.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Quadríceps Em Quatro Apoios');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Reverso Assistido Peito E Ombro', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_reverso_assistido_peito_e_ombro.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Reverso Assistido Peito E Ombro');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Reverso De Pulso', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_reverso_de_pulso.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Reverso De Pulso');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Sentado Panturrilha Perna Esticada', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_sentado_panturrilha_perna_esticada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Sentado Panturrilha Perna Esticada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Tendão De Aquiles Em Pé', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_tendão_de_aquiles_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Tendão De Aquiles Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Tibial Posterior', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_tibial_posterior.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Tibial Posterior');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Trato Iliotibial Com Rolo De Espuma', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_trato_iliotibial_com_rolo_de_espuma.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Trato Iliotibial Com Rolo De Espuma');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Tríceps Em Pé', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamento_tríceps_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Tríceps Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamentos De Pés E Tornozelos', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/alongamentos_de_pés_e_tornozelos.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamentos De Pés E Tornozelos');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Arremesso De Bola De Reação', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/arremesso_de_bola_de_reação.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Arremesso De Bola De Reação');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Catavento Corporal', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/catavento_corporal.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Catavento Corporal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Contração Abdominal', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/contração_abdominal.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Contração Abdominal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Círculos Com Os Braços', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/círculos_com_os_braços.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Círculos Com Os Braços');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Círculos Com Um Braço', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/círculos_com_um_braço.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Círculos Com Um Braço');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cópia De Rotação Externa De Ombro Com Faixa Elástica', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/cópia_de_rotação_externa_de_ombro_com_faixa_elástica.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cópia De Rotação Externa De Ombro Com Faixa Elástica');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Deslize De Parede Do Serrátil Com Rolo De Espuma', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/deslize_de_parede_do_serrátil_com_rolo_de_espuma.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Deslize De Parede Do Serrátil Com Rolo De Espuma');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Dorsiflexão Plantar', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/dorsiflexão_plantar.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Dorsiflexão Plantar');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação Lateral De Deltóide Posterior Com Halteres', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/elevação_lateral_de_deltóide_posterior_com_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação Lateral De Deltóide Posterior Com Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Exercício De Bailarina Sentada', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/exercício_de_bailarina_sentada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Exercício De Bailarina Sentada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Exercício Retração Escapular Sentada', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/exercício_retração_escapular_sentada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Exercício Retração Escapular Sentada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Alternada Ombro', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/flexão_alternada_ombro.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Alternada Ombro');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Inclinação Lateral Em Pé', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/inclinação_lateral_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Inclinação Lateral Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Inclinação Lateral', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/inclinação_lateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Inclinação Lateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Joelho Alternado No Peito', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/joelho_alternado_no_peito.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Joelho Alternado No Peito');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Levantamento De Braço Apoiado Na Parede', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/levantamento_de_braço_apoiado_na_parede.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Levantamento De Braço Apoiado Na Parede');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Postura Arco Oscilante', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/postura_arco_oscilante.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Postura Arco Oscilante');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Postura Arco', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/postura_arco.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Postura Arco');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Postura Da Cobra   Alongamento Abdominal', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/postura_da_cobra_-_alongamento_abdominal.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Postura Da Cobra   Alongamento Abdominal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Postura Da Virilha Sentada ', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/postura_da_virilha_sentada_.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Postura Da Virilha Sentada ');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Postura De Meio Sapo', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/postura_de_meio_sapo.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Postura De Meio Sapo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Postura De Peixe', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/postura_de_peixe.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Postura De Peixe');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Postura Do Bebê Feliz', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/postura_do_bebê_feliz.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Postura Do Bebê Feliz');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Postura Sapo', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/postura_sapo.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Postura Sapo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Protração E Retração Da Escápula', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/protração_e_retração_da_escápula.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Protração E Retração Da Escápula');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Puxada Escapular Na Barra Fixa', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/puxada_escapular_na_barra_fixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Puxada Escapular Na Barra Fixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Pêndulo De Ombro', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/pêndulo_de_ombro.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Pêndulo De Ombro');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Quadrúpede Com Elevação De Braço E Perna Contralateral', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/quadrúpede_com_elevação_de_braço_e_perna_contralateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Quadrúpede Com Elevação De Braço E Perna Contralateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rolagem De Espuma Para Isquiotibiais', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rolagem_de_espuma_para_isquiotibiais.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rolagem De Espuma Para Isquiotibiais');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rolamento De Espuma Nas Costas', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rolamento_de_espuma_nas_costas.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rolamento De Espuma Nas Costas');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rolamento De Espuma Nos Quadríceps', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rolamento_de_espuma_nos_quadríceps.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rolamento De Espuma Nos Quadríceps');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rolamento De Espuma Nos Romboides', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rolamento_de_espuma_nos_romboides.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rolamento De Espuma Nos Romboides');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rolamento De Espuma Para Panturrilhas', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rolamento_de_espuma_para_panturrilhas.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rolamento De Espuma Para Panturrilhas');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rolando Com Bola', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rolando_com_bola.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rolando Com Bola');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rolo De Espuma Ombro Posterior', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rolo_de_espuma_ombro_posterior.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rolo De Espuma Ombro Posterior');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rolo De Espuma Para Fascite Plantar', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rolo_de_espuma_para_fascite_plantar.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rolo De Espuma Para Fascite Plantar');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rolo De Espuma Para Ombro E Peito Frontal', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rolo_de_espuma_para_ombro_e_peito_frontal.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rolo De Espuma Para Ombro E Peito Frontal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rolo De Espuma Para Os Glúteos', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rolo_de_espuma_para_os_glúteos.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rolo De Espuma Para Os Glúteos');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Corpo Superior Deitado', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_corpo_superior_deitado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Corpo Superior Deitado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Da Coluna Torácica De Joelhos', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_da_coluna_torácica_de_joelhos.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Da Coluna Torácica De Joelhos');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação De Pé E Tornozelo', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_de_pé_e_tornozelo.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação De Pé E Tornozelo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Em Pé', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Espinhal Deitado', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_espinhal_deitado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Espinhal Deitado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Externa Com Cabo A 90 Graus', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_externa_com_cabo_a_90_graus.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Externa Com Cabo A 90 Graus');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Externa Com Cabo Em Posição De Joelhos', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_externa_com_cabo_em_posição_de_joelhos.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Externa Com Cabo Em Posição De Joelhos');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Externa De Ombro Com Cabo', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_externa_de_ombro_com_cabo.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Externa De Ombro Com Cabo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Externa De Ombro Com Faixa Elástica', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_externa_de_ombro_com_faixa_elástica.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Externa De Ombro Com Faixa Elástica');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Externa De Quadril Com Faixa Elástica', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_externa_de_quadril_com_faixa_elástica.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Externa De Quadril Com Faixa Elástica');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Externa De Quadril Sentado Com Faixa Elástica', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_externa_de_quadril_sentado_com_faixa_elástica.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Externa De Quadril Sentado Com Faixa Elástica');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Externa Do Ombro Deitado Com Haltere', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_externa_do_ombro_deitado_com_haltere.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Externa Do Ombro Deitado Com Haltere');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Externa Do Ombro', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_externa_do_ombro.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Externa Do Ombro');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Externa Do Pé Com Faixa Elástica', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_externa_do_pé_com_faixa_elástica.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Externa Do Pé Com Faixa Elástica');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Externa Halteres Apoiada No Banco', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_externa_halteres_apoiada_no_banco.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Externa Halteres Apoiada No Banco');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Interna De Cabo A 90 Graus', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_interna_de_cabo_a_90_graus.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Interna De Cabo A 90 Graus');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Interna De Ombro Com Cabo', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_interna_de_ombro_com_cabo.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Interna De Ombro Com Cabo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Interna Do Ombro Sentada Com Cabo', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_interna_do_ombro_sentada_com_cabo.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Interna Do Ombro Sentada Com Cabo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Interna Do Ombro', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_interna_do_ombro.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Interna Do Ombro');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Interna Do Quadril Sentado Com Faixa Elástica', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_interna_do_quadril_sentado_com_faixa_elástica.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Interna Do Quadril Sentado Com Faixa Elástica');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Para Trás Joelhos', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/rotação_para_trás_joelhos.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Para Trás Joelhos');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Superman', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/superman.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Superman');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Toque Lateral Dos Dedos Dos Pés Em Pé', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/toque_lateral_dos_dedos_dos_pés_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Toque Lateral Dos Dedos Dos Pés Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Toque Nos Dedos Dos Pés Em Pé', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/toque_nos_dedos_dos_pés_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Toque Nos Dedos Dos Pés Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Toque Nos Dedos Dos Pés Sentado', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/toque_nos_dedos_dos_pés_sentado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Toque Nos Dedos Dos Pés Sentado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Toques De Dedos Em Pé', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/toques_de_dedos_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Toques De Dedos Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Torção Oblíqua Sentada', 'Mobilidade-alongamento', 'https://cdn.metsuke.app.br/exercises/mobilidade-alongamento/torção_oblíqua_sentada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Torção Oblíqua Sentada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Abdução De Quadril', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/abdução_de_quadril.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Abdução De Quadril');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alog Abdominais1', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/alog_abdominais1.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alog Abdominais1');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Along Adutores1', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/along_adutores1.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Along Adutores1');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Along Bíceps1', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/along_bíceps1.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Along Bíceps1');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Along Extensão De Braços1', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/along_extensão_de_braços1.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Along Extensão De Braços1');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Along Flexores De Quadril', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/along_flexores_de_quadril.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Along Flexores De Quadril');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Along Flexão Do Quadril Sentado', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/along_flexão_do_quadril_sentado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Along Flexão Do Quadril Sentado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Along Glúteos1', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/along_glúteos1.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Along Glúteos1');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Along Isquiotibiais Sentado', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/along_isquiotibiais_sentado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Along Isquiotibiais Sentado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Along Lateral Pescoço', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/along_lateral_pescoço.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Along Lateral Pescoço');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Along Lombar Uni1', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/along_lombar_uni1.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Along Lombar Uni1');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Along Lombar1', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/along_lombar1.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Along Lombar1');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Along Ombrovpeitoral', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/along_ombrovpeitoral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Along Ombrovpeitoral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Along Romboide1', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/along_romboide1.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Along Romboide1');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Along Rotação Cruzado', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/along_rotação_cruzado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Along Rotação Cruzado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Along Sobre Os Calcanhares1', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/along_sobre_os_calcanhares1.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Along Sobre Os Calcanhares1');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Along Tendões1', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/along_tendões1.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Along Tendões1');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Along Torácica1', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/along_torácica1.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Along Torácica1');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Along Tronco Ajoelhado1', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/along_tronco_ajoelhado1.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Along Tronco Ajoelhado1');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Along Tríceps1', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/along_tríceps1.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Along Tríceps1');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Afundo', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/alongamento_afundo.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Afundo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Asa Maior Sentado', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/alongamento_asa_maior_sentado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Asa Maior Sentado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento De Flexores De Quadril', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/alongamento_de_flexores_de_quadril.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento De Flexores De Quadril');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento De Rotação Quadril Lombar', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/alongamento_de_rotação_quadril_lombar.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento De Rotação Quadril Lombar');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alongamento Isquitibiais', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/alongamento_isquitibiais.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alongamento Isquitibiais');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cão Descendente', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/cão_descendente.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cão Descendente');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação De Ombro', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/elevação_de_ombro.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação De Ombro');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Escapular', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/escapular.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Escapular');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Estocada Lateral', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/estocada_lateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Estocada Lateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Estocada Pra Frente', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/estocada_pra_frente.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Estocada Pra Frente');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Extensão Torácica', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/extensão_torácica.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Extensão Torácica');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Isquiotibiais', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/isquiotibiais.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Isquiotibiais');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Joelho Ao Peito Uni', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/joelho_ao_peito_uni.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Joelho Ao Peito Uni');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Joelho Ao Peito', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/joelho_ao_peito.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Joelho Ao Peito');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Lúpulo Controlado Com Banda', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/lúpulo_controlado_com_banda.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Lúpulo Controlado Com Banda');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Meia Rotação Pescoço', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/meia_rotação_pescoço.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Meia Rotação Pescoço');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Ponte1', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/ponte1.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Ponte1');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Pose Criança Alongamento', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/pose_criança_alongamento.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Pose Criança Alongamento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Postura De Águia', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/postura_de_águia.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Postura De Águia');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Postura Do Gato', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/postura_do_gato.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Postura Do Gato');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Quadrngulo Interno', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/quadrngulo_interno.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Quadrngulo Interno');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Quadrupede Limbs', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/quadrupede_limbs.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Quadrupede Limbs');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rolamento De Banda', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/rolamento_de_banda.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rolamento De Banda');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca De Perna Deitada', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/rosca_de_perna_deitada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca De Perna Deitada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotaçao De Quadril', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/rotaçao_de_quadril.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotaçao De Quadril');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação De Tronco Sentado Lateral', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/rotação_de_tronco_sentado_lateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação De Tronco Sentado Lateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação De Tronco Superior', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/rotação_de_tronco_superior.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação De Tronco Superior');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação De Tronco', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/rotação_de_tronco.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação De Tronco');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Dos Ombros', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/rotação_dos_ombros.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Dos Ombros');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Lateral Do Pescoço', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/rotação_lateral_do_pescoço.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Lateral Do Pescoço');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação Ombro Circular', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/rotação_ombro_circular.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação Ombro Circular');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Superhomem1', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/superhomem1.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Superhomem1');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Torção Reclinada', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/torção_reclinada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Torção Reclinada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Trecho Cobra', 'Alongamentos', 'https://cdn.metsuke.app.br/exercises/alongamentos/trecho_cobra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Trecho Cobra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Abd Maquina', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/abd_maquina.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Abd Maquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Abdominal Alternado', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/abdominal_alternado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Abdominal Alternado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Abdominl Banco Alternado', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/abdominl_banco_alternado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Abdominl Banco Alternado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Abds', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/abds.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Abds');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alternado Apoiado', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/alternado_apoiado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alternado Apoiado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alternate Heel Touchers', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/alternate-heel-touchers.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alternate Heel Touchers');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Ball Sit Up', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/ball-sit-up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Ball Sit Up');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Rollout(1)', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/barbell-rollout(1).mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Rollout(1)');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Rollout', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/barbell-rollout.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Rollout');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bicycle Abdominal Movement', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/bicycle-crunch-movement.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bicycle Abdominal Movement');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Body Saw Prancha', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/body-saw-plank.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Body Saw Prancha');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Butterfly Sit Up', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/butterfly-sit-up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Butterfly Sit Up');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Conventional Sit Up', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/conventional-sit-up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Conventional Sit Up');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Abdominal Floor', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/crunch-floor.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Abdominal Floor');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Abdominal With Leg Elevação', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/crunch-with-leg-raise.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Abdominal With Leg Elevação');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Abdominal', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/crunch.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Abdominal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Declinado Abdominal', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/decline-crunch.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Declinado Abdominal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Declinado Sit Up', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/decline-sit-up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Declinado Sit Up');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Dragon Flag', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/dragon-flag.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Dragon Flag');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elbow To Knee Sit Up Movement', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/elbow-to-knee-sit-up-movement.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elbow To Knee Sit Up Movement');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Engate Bola', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/engate_bola.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Engate Bola');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Explosion', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/explosion.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Explosion');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Extensão Ponte', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/flexão_extensão_ponte.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Extensão Ponte');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Frog Abdominal', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/frog-crunch.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Frog Abdominal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Hanging Knee Raises', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/hanging-knee-raises.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Hanging Knee Raises');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Infra Banco', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/infra_banco.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Infra Banco');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Infra Maquina', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/infra_maquina.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Infra Maquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Infra Supra Banco', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/infra_supra_banco.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Infra Supra Banco');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Infra Uni', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/infra_uni.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Infra Uni');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Infra Up Inclinado', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/infra_up_inclinado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Infra Up Inclinado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Infra Up', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/infra_up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Infra Up');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Infra', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/infra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Infra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Invertido Bola', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/invertido_bola.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Invertido Bola');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Lateralizado', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/lateralizado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Lateralizado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Mergulho Ponte', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/mergulho_ponte.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Mergulho Ponte');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Mergulho Total', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/mergulho_total.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Mergulho Total');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Mergulho', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/mergulho.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Mergulho');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Oblíquo Alternado', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/oblíquo_alternado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Oblíquo Alternado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Oblíquo Barra', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/oblíquo_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Oblíquo Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Oblíquo Bola', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/oblíquo_bola.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Oblíquo Bola');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Oblíquo Em Pé Halter', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/oblíquo_em_pé_halter.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Oblíquo Em Pé Halter');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Oblíquo Inclinado', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/oblíquo_inclinado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Oblíquo Inclinado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Oblíquo Lateral', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/oblíquo_lateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Oblíquo Lateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Oblíquo Pernas Extendidas', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/oblíquo_pernas_extendidas.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Oblíquo Pernas Extendidas');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Oblíquo Polia Alta', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/oblíquo_polia_alta.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Oblíquo Polia Alta');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Oblíquo Polia Baixa', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/oblíquo_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Oblíquo Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Oblíquo Sentado', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/oblíquo_sentado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Oblíquo Sentado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Oblíquo Toque Lateral', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/oblíquo_toque_lateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Oblíquo Toque Lateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Oblíquo', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/oblíquo.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Oblíquo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Prancha Carga', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/plank_carga.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Prancha Carga');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Prancha(1)', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/plank(1).mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Prancha(1)');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Prancha', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/plank.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Prancha');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Pmp', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/pmp.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Pmp');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Ponte Cruzada', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/ponte_cruzada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Ponte Cruzada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Ponte Lateral Flex', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/ponte_lateral_flex.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Ponte Lateral Flex');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Ponte Movimentada', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/ponte_movimentada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Ponte Movimentada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Ponte', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/ponte.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Ponte');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Push Desenvolvimento 1', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/push-press-1.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Push Desenvolvimento 1');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Raised Sit Up', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/raised-sit-up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Raised Sit Up');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Reverse Abdominal', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/reverse-crunch.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Reverse Abdominal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rolinho', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/rolinho.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rolinho');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rolo Total Barra', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/rolo_total_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rolo Total Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rotação', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/rotação.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rotação');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Lateral Abdominal', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/side-crunch.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Lateral Abdominal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Stability Ball Rollout', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/stability-ball-rollout.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Stability Ball Rollout');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Em Pé Cabo Abdominal', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/standing-cable-crunch.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Em Pé Cabo Abdominal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Straddle Planche', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/straddle-planche.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Straddle Planche');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Straight Leg Abdominal', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/straight-leg-crunch.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Straight Leg Abdominal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Super Man', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/super_man.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Super Man');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Supra Banco', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/supra_banco.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Supra Banco');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Supra Com Carga', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/supra_com_carga.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Supra Com Carga');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Supra Elevado', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/supra_elevado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Supra Elevado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Supra Encaixe', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/supra_encaixe.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Supra Encaixe');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Supra Flexionado', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/supra_flexionado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Supra Flexionado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Supra Mãos Extendidas', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/supra_mãos_extendidas.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Supra Mãos Extendidas');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Supra Polia Alta', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/supra_polia_alta.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Supra Polia Alta');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Supra Sapo', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/supra_sapo.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Supra Sapo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Supra Total', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/supra_total.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Supra Total');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tesoura Inclinado', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/tesoura_inclinado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tesoura Inclinado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tesoura', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/tesoura.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tesoura');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Total Bola', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/total_bola.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Total Bola');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tptal Polia Baixa', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/tptal_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tptal Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'V Sit Ups', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/v-sit-ups.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'V Sit Ups');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Wall Abdominal', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/wall-crunch.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Wall Abdominal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Weightedsitups', 'Abdominais', 'https://cdn.metsuke.app.br/exercises/abdominais/weightedsitups.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Weightedsitups');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Reverse Rosca', 'Antebraço', 'https://cdn.metsuke.app.br/exercises/antebraço/barbell-reverse-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Reverse Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cacho De Punho Neutra', 'Antebraço', 'https://cdn.metsuke.app.br/exercises/antebraço/cacho_de_punho_neutra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cacho De Punho Neutra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Curva De Punho Com Barra', 'Antebraço', 'https://cdn.metsuke.app.br/exercises/antebraço/curva_de_punho_com_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Curva De Punho Com Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Curva De Punho Invertida', 'Antebraço', 'https://cdn.metsuke.app.br/exercises/antebraço/curva_de_punho_invertida.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Curva De Punho Invertida');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Reverse Rosca', 'Antebraço', 'https://cdn.metsuke.app.br/exercises/antebraço/dumbbell-reverse-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Reverse Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Reverse Wrist Rosca Muscles', 'Antebraço', 'https://cdn.metsuke.app.br/exercises/antebraço/dumbbell-reverse-wrist-curl-muscles.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Reverse Wrist Rosca Muscles');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Wrist Rosca', 'Antebraço', 'https://cdn.metsuke.app.br/exercises/antebraço/dumbbell-wrist-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Wrist Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Hand Grip', 'Antebraço', 'https://cdn.metsuke.app.br/exercises/antebraço/hand_grip.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Hand Grip');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Punho Reverso', 'Antebraço', 'https://cdn.metsuke.app.br/exercises/antebraço/punho_reverso.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Punho Reverso');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rolo De Punho', 'Antebraço', 'https://cdn.metsuke.app.br/exercises/antebraço/rolo_de_punho.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rolo De Punho');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca De Dedo Com Barra', 'Antebraço', 'https://cdn.metsuke.app.br/exercises/antebraço/rosca_de_dedo_com_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca De Dedo Com Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca De Punho Com Halter', 'Antebraço', 'https://cdn.metsuke.app.br/exercises/antebraço/rosca_de_punho_com_halter.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca De Punho Com Halter');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca De Punho Neutra', 'Antebraço', 'https://cdn.metsuke.app.br/exercises/antebraço/rosca_de_punho_neutra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca De Punho Neutra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca De Punho Por Trás', 'Antebraço', 'https://cdn.metsuke.app.br/exercises/antebraço/rosca_de_punho_por_trás.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca De Punho Por Trás');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca De Punho Reversa Apoiado', 'Antebraço', 'https://cdn.metsuke.app.br/exercises/antebraço/rosca_de_punho_reversa_apoiado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca De Punho Reversa Apoiado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca De Punho Reversa Com Barra', 'Antebraço', 'https://cdn.metsuke.app.br/exercises/antebraço/rosca_de_punho_reversa_com_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca De Punho Reversa Com Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Reversa Com Barra', 'Antebraço', 'https://cdn.metsuke.app.br/exercises/antebraço/rosca_reversa_com_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Reversa Com Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Wrist Circles', 'Antebraço', 'https://cdn.metsuke.app.br/exercises/antebraço/wrist-circles.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Wrist Circles');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Wrist Flexion', 'Antebraço', 'https://cdn.metsuke.app.br/exercises/antebraço/wrist-flexion.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Wrist Flexion');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alternada No Scott', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/alternada_no_scott.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alternada No Scott');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alternating Hammer Curls', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/alternating-hammer-curls.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alternating Hammer Curls');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Arm Blaster Benefits', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/arm-blaster-benefits.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Arm Blaster Benefits');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Cheat Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/barbell-cheat-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Cheat Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/barbell-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Preacher Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/barbell-preacher-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Preacher Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bayesian Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/bayesian-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bayesian Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bicep Rosca Máquina', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/bicep-curl-machine.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bicep Rosca Máquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bíceps Apoiado Polia Baixa', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/bíceps_apoiado_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bíceps Apoiado Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bíceps Corda', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/bíceps_corda.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bíceps Corda');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bíceps Inclinad0 Crossover', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/bíceps_inclinad0_crossover.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bíceps Inclinad0 Crossover');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bíceps Inclinado Polia Baixa', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/bíceps_inclinado_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bíceps Inclinado Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bíceps Na Máquina', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/bíceps_na_máquina.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bíceps Na Máquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bíceps Polia Alta Unilateral', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/bíceps_polia_alta_unilateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bíceps Polia Alta Unilateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bíceps Polia Alta', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/bíceps_polia_alta.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bíceps Polia Alta');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bíceps Polia Baixa', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/bíceps_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bíceps Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Bicep Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/cable-bicep-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Bicep Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Unilateral Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/cable-one-arm-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Unilateral Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Preacher Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/cable-preacher-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Preacher Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Single Arm Hammer Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/cable-single-arm-hammer-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Single Arm Hammer Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Underhand Remada', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/cable-underhand-row.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Underhand Remada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Close Grip Barra Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/close-grip-barbell-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Close Grip Barra Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cross Body Hammer Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/cross-body-hammer-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cross Body Hammer Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Bicep Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/dumbbell-bicep-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Bicep Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Concentration Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/dumbbell-concentration-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Concentration Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Hammer Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/dumbbell-hammer-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Hammer Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Inclinado Hammer Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/dumbbell-incline-hammer-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Inclinado Hammer Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Preacher Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/dumbbell-preacher-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Preacher Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Preacher Hammer Curls', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/dumbbell-preacher-hammer-curls.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Preacher Hammer Curls');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Sentado Zottman Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/dumbbell-seated-zottman-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Sentado Zottman Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Ez Bar Bicep Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/ez-bar-bicep-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Ez Bar Bicep Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Ez Bar Preacher Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/ez-bar-preacher-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Ez Bar Preacher Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Inclinado Halter Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/incline-dumbbell-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Inclinado Halter Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Lateral Bicep Curls', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/lateral-bicep-curls.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Lateral Bicep Curls');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Martelo No Scott', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/martelo_no_scott.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Martelo No Scott');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Martelo Scott', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/martelo_scott.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Martelo Scott');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Overhead Cabo Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/overhead-cable-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Overhead Cabo Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Prone Inclinado Halter Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/prone-incline-dumbbell-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Prone Inclinado Halter Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca 2 Tempos', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_2_tempos.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca 2 Tempos');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Aberta', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_aberta.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Aberta');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Alternada', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_alternada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Alternada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Alternado Inclinado', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_alternado_inclinado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Alternado Inclinado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Apoiada Inclinada', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_apoiada_inclinada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Apoiada Inclinada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Com Rotação Sentado', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_com_rotação_sentado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Com Rotação Sentado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Concentrada', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_concentrada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Concentrada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Direta Aberta', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_direta_aberta.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Direta Aberta');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Direta Barra Média', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_direta_barra_média.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Direta Barra Média');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Direta Deitado', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_direta_deitado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Direta Deitado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Direta Inclinada Com Barra', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_direta_inclinada_com_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Direta Inclinada Com Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Direta Na Barra', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_direta_na_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Direta Na Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Direta Polia Baixa', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_direta_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Direta Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Direta W', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_direta_w.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Direta W');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Fechada W', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_fechada_w.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Fechada W');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Inclinada', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_inclinada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Inclinada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Martelo Aberto', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_martelo_aberto.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Martelo Aberto');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Martelo Alternada Sentado', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_martelo_alternada_sentado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Martelo Alternada Sentado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Martelo Alternado', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_martelo_alternado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Martelo Alternado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Reversa Máquina', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_reversa_máquina.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Reversa Máquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Reversa Polia Baixa', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_reversa_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Reversa Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Reversa W', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_reversa_w.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Reversa W');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Reversa', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_reversa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Reversa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Rotação Radio Ulnar', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_rotação_radio_ulnar.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Rotação Radio Ulnar');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Scott Em Pé', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_scott_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Scott Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rosca Scott W', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/rosca_scott_w.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rosca Scott W');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Scott Em Pé', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/scott_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Scott Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Scott Na Máquina', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/scott_na_máquina.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Scott Na Máquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Supine Halter Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/supine-dumbbell-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Supine Halter Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Wide Grip Barra Curls', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/wide-grip-barbell-curls.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Wide Grip Barra Curls');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Wide Grip Ez Bar Rosca', 'Bíceps', 'https://cdn.metsuke.app.br/exercises/bíceps/wide-grip-ez-bar-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Wide Grip Ez Bar Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Airbike', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/airbike.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Airbike');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alpinista', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/alpinista.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alpinista');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bike Horizontal', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/bike_horizontal.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bike Horizontal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bike Vertical', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/bike_vertical.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bike Vertical');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bike', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/bike.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bike');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Caminhada Rápida', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/caminhada_rápida.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Caminhada Rápida');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Caminhada', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/caminhada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Caminhada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Chutes De Bunda', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/chutes_de_bunda.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Chutes De Bunda');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cooper', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/cooper.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cooper');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Corda Mariner', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/corda_mariner.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Corda Mariner');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Corrida De Pés Rápida', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/corrida_de_pés_rápida.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Corrida De Pés Rápida');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Corrida Estática', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/corrida_estática.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Corrida Estática');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Corrida Para Trás', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/corrida_para_trás.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Corrida Para Trás');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Eliptico Braços', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/eliptico_braços.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Eliptico Braços');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elíptico C Braços', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/elíptico_c_braços.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elíptico C Braços');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elíptico', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/elíptico.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elíptico');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Energy Pular', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/energy_pular.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Energy Pular');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Escada', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/escada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Escada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Esteira Inclinda', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/esteira_inclinda.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Esteira Inclinda');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Esteira', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/esteira.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Esteira');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Jumping Jack', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/jumping_jack.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Jumping Jack');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Plyo Jacks', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/plyo_jacks.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Plyo Jacks');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Prank', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/prank.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Prank');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Pular Corda', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/pular_corda.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Pular Corda');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Toe Touch', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/push_up_toe_touch.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Toe Touch');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rodada', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/rodada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rodada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rowing', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/rowing.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rowing');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Spinning', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/spinning.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Spinning');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Split Jacks', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/split_jacks.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Split Jacks');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Torçoes', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/torçoes.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Torçoes');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Treadmill Manual', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/treadmill_manual.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Treadmill Manual');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Tuck Jump', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/tuck_jump.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Tuck Jump');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Velocista Assistida', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/velocista_assistida.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Velocista Assistida');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Zig Zag', 'Cardio', 'https://cdn.metsuke.app.br/exercises/cardio/zig_zag.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Zig Zag');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Back Extensão', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/back-extension.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Back Extensão');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Band Assisted Barra Fixa', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/band-assisted-pull-up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Band Assisted Barra Fixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Band Lat Pulldown', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/band-lat-pulldown.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Band Lat Pulldown');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Band Pull Apart', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/band-pull-apart.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Band Pull Apart');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Banded Wide Grip Remada', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/banded-wide-grip-row.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Banded Wide Grip Remada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Bent Over Remada', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/barbell-bent-over-row.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Bent Over Remada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Shrug Muscles', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/barbell-shrug-muscles.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Shrug Muscles');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Upright Remada Em Pé', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/barbell-upright-row-standing.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Upright Remada Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Assistida', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/barra_assistida.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Assistida');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Fixa Aberta', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/barra_fixa_aberta.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Fixa Aberta');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Fixa Com Carga', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/barra_fixa_com_carga.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Fixa Com Carga');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Fixa Fechada', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/barra_fixa_fechada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Fixa Fechada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Fixa Por Trás', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/barra_fixa_por_trás.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Fixa Por Trás');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Behind The Back Shrug', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/behind-the-back-shrug.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Behind The Back Shrug');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Face Pull', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/cable-face-pull.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Face Pull');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Frontal Elevação Movement', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/cable-front-raise-movement.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Frontal Elevação Movement');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Pushdown', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/cable-pushdown.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Pushdown');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Posterior Delt Fly', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/cable-rear-delt-fly.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Posterior Delt Fly');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Sentado Remada', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/cable-seated-row.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Sentado Remada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Shrug', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/cable-shrug.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Shrug');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Wide Grip Remada', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/cable-wide-grip-row.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Wide Grip Remada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Duplo Neutra', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/cabo_duplo_neutra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Duplo Neutra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Chin Ups', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/chin-ups.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Chin Ups');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Close Grip Lat Pulldown Standard Bar Attachment', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/close-grip-lat-pulldown-standard-bar-attachment.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Close Grip Lat Pulldown Standard Bar Attachment');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Close Grip Lat Pulldown', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/close-grip-lat-pulldown.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Close Grip Lat Pulldown');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cruzado Polia Alta', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/cruzado_polia_alta.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cruzado Polia Alta');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Dead Hang', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/dead-hang.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Dead Hang');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Back Extensão', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/dumbbell-back-extension.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Back Extensão');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Face Pull', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/dumbbell-face-pull.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Face Pull');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Jefferson Rosca', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/dumbbell-jefferson-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Jefferson Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Posterior Delt Fly', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/dumbbell-rear-delt-fly.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Posterior Delt Fly');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Eccentric Barra Fixa', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/eccentric-pull-up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Eccentric Barra Fixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Kettlebell Lateral Elevação', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/kettlebell-lateral-raise.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Kettlebell Lateral Elevação');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Landmine Remada', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/landmine-row.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Landmine Remada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Linha Invertida', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/linha_invertida.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Linha Invertida');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Maquina Encurtada', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/maquina_encurtada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Maquina Encurtada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Neutral Grip Cabo Rows', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/neutral-grip-cable-rows.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Neutral Grip Cabo Rows');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Pendlay Remada', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/pendlay-row.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Pendlay Remada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Fixa Fechado', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/pull_up_fechado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Fixa Fechado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Fixa Pegada Reversa', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/pull_up_pegada_reversa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Fixa Pegada Reversa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Fixa', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/pull-up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Fixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Pulldown Corda', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/pulldown_corda.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Pulldown Corda');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Pulldown Frontal', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/pulldown_frontal.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Pulldown Frontal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Puxada Alta Fechada', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/puxada_alta_fechada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Puxada Alta Fechada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Puxada Alta Pegada Reversa', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/puxada_alta_pegada_reversa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Puxada Alta Pegada Reversa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Puxada De Polia Unilateral', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/puxada_de_polia_unilateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Puxada De Polia Unilateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Puxada Frontal', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/puxada_frontal.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Puxada Frontal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Puxada Por Trás', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/puxada_por_trás.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Puxada Por Trás');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Puxada Unilateral', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/puxada_unilateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Puxada Unilateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Aberta', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/remada_aberta.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Aberta');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Cavalinho', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/remada_cavalinho.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Cavalinho');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Com Barra', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/remada_com_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Com Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Curvada Com Barra', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/remada_curvada_com_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Curvada Com Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Curvada Smith', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/remada_curvada_smith.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Curvada Smith');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Curvada Up', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/remada_curvada_up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Curvada Up');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada De Polia Ajoelhado', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/remada_de_polia_ajoelhado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada De Polia Ajoelhado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Em T', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/remada_em_t.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Em T');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Esterno', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/remada_esterno.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Esterno');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Fechada Banco', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/remada_fechada_banco.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Fechada Banco');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Fechado', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/remada_fechado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Fechado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Inclinada Com Barra', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/remada_inclinada_com_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Inclinada Com Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Inclinada Com Pegada Invertida', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/remada_inclinada_com_pegada_invertida.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Inclinada Com Pegada Invertida');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Maquina', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/remada_maquina.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Maquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Polia Baixa', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/remada_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Reversa', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/remada_reversa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Reversa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Sentado', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/remada_sentado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Sentado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remo Na Máquina', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/remo_na_máquina.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remo Na Máquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Reverse Grip Lat Pulldown', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/reverse-grip-lat-pulldown.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Reverse Grip Lat Pulldown');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Reverse Pec Dec Máquina', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/reverse-pec-dec-machine.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Reverse Pec Dec Máquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Serrote', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/serrote.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Serrote');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Single Arm Bent Over Remada', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/single-arm-bent-over-row.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Single Arm Bent Over Remada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Single Arm Halter Remada', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/single-arm-dumbbell-row.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Single Arm Halter Remada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Em Pé Cabo Remada', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/standing-cable-row.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Em Pé Cabo Remada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'T Bar Remada Muscles', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/t-bar-row-muscles.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'T Bar Remada Muscles');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Upright Cabo Remada', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/upright-cable-row.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Upright Cabo Remada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Wide Grip Lat Pulldown', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/wide-grip-lat-pulldown.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Wide Grip Lat Pulldown');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Yates Remada', 'Costas', 'https://cdn.metsuke.app.br/exercises/costas/yates-row.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Yates Remada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '3 Apoios Flexionado', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/3_apoios_flexionado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '3 Apoios Flexionado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT '4 Apoios Braços Extendidos', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/4_apoios_braços_extendidos.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = '4 Apoios Braços Extendidos');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Abdutor', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/abdutor.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Abdutor');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Abdução No Abdutor Adutor', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/abdução_no_abdutor_adutor.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Abdução No Abdutor Adutor');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Abdução Polia Baixa', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/abdução_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Abdução Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Agachamento Polia Baixa', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/agachamento_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Agachamento Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'B Stance Hip Thrust', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/b-stance-hip-thrust.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'B Stance Hip Thrust');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Band Donkey Kickback', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/band-donkey-kickback.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Band Donkey Kickback');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Band Em Pé Hip Extensão', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/band-standing-hip-extension.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Band Em Pé Hip Extensão');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Hip Thrust', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/barbell-hip-thrust.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Hip Thrust');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bodyweight Hip Thrust', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/bodyweight-hip-thrust.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bodyweight Hip Thrust');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bom Dia', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/bom_dia.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bom Dia');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Kickback', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/cable-kickback.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Kickback');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Step Up', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/cable-step-up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Step Up');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Contração Abre E Fecha', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/contração_abre_e_fecha.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Contração Abre E Fecha');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevated Glute Bridge', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/elevated-glute-bridge.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevated Glute Bridge');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevaçaõ Pélica Com Carga', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/elevaçaõ_pélica_com_carga.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevaçaõ Pélica Com Carga');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação De Pelvis Unilateral', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/elevação_de_pelvis_unilateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação De Pelvis Unilateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação Pélvica Apoio Unilateral', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/elevação_pélvica_apoio_unilateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação Pélvica Apoio Unilateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação Pélvica Smith', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/elevação_pélvica_smith.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação Pélvica Smith');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação Pévica Com Barra Apoio Das Costas', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/elevação_pévica_com_barra_apoio_das_costas.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação Pévica Com Barra Apoio Das Costas');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação Pévica Com Barra Apoio Dos Pés', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/elevação_pévica_com_barra_apoio_dos_pés.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação Pévica Com Barra Apoio Dos Pés');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Frog Pump', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/frog-pump.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Frog Pump');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Glute Bridge', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/glute-bridge.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Glute Bridge');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Glute Ham Elevação Muscles', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/glute-ham-raise-muscles.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Glute Ham Elevação Muscles');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Glúteo  Polia Baixa', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/glúteo__polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Glúteo  Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Glúteo 3 Apoios Banco', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/glúteo_3_apoios_banco.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Glúteo 3 Apoios Banco');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Glúteo Maquina Kick Back', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/glúteo_maquina_kick_back.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Glúteo Maquina Kick Back');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Glúteo Máquina Em Pé', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/glúteo_máquina_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Glúteo Máquina Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Glúteo Na Máquina Apoiado', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/glúteo_na_máquina_apoiado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Glúteo Na Máquina Apoiado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Glúteo Smith', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/glúteo_smith.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Glúteo Smith');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Heel Elevated Hip Thrust', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/heel-elevated-hip-thrust.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Heel Elevated Hip Thrust');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Kneeling Hip Thrust', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/kneeling-hip-thrust.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Kneeling Hip Thrust');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Quadruped Leg Rosca', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/quadruped-leg-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Quadruped Leg Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Single Leg Glute Bridge', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/single-leg-glute-bridge.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Single Leg Glute Bridge');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Single Leg Hip Thrust Muscles', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/single-leg-hip-thrust-muscles.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Single Leg Hip Thrust Muscles');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Stiff Barra Reta', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/stiff_barra_reta.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Stiff Barra Reta');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Stiff Barra', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/stiff_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Stiff Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Stiff Flexionado Barra', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/stiff_flexionado_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Stiff Flexionado Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Stiff Flexionado Carga', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/stiff_flexionado_carga.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Stiff Flexionado Carga');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Stiff Flexionado Halteres', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/stiff_flexionado_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Stiff Flexionado Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Stiff Smith', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/stiff_smith.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Stiff Smith');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Straight Leg Glute Bridge', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/straight-leg-glute-bridge.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Straight Leg Glute Bridge');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Sumô Barra', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/sumô_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Sumô Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Sumô Dumbell', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/sumô_dumbell.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Sumô Dumbell');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Sumô Frontal', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/sumô_front.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Sumô Frontal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Table Top Glute Bridge', 'Glúteos', 'https://cdn.metsuke.app.br/exercises/glúteos/table-top-glute-bridge.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Table Top Glute Bridge');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Abdutor Máquina', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/abdutor_máquina.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Abdutor Máquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Adutor Maquina', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/adutor_maquina.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Adutor Maquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Adutor Na Polia Baixa', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/adutor_na_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Adutor Na Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Adutor Tesoura', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/adutor_tesoura.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Adutor Tesoura');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Adutor', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/adutor.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Adutor');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Afundo Caminhada', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/afundo_caminhada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Afundo Caminhada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Afundo Com Barra', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/afundo_com_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Afundo Com Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Afundo Inclinado', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/afundo_inclinado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Afundo Inclinado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Afundo Lateralizado', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/afundo_lateralizado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Afundo Lateralizado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Afundo Smith', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/afundo_smith.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Afundo Smith');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Agachamento  Frontal', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/agachamento__front.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Agachamento  Frontal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Agachamento Bola', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/agachamento_bola.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Agachamento Bola');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Agachamento Com Barra', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/agachamento_com_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Agachamento Com Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Agachamento Com Up', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/agachamento_com_up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Agachamento Com Up');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Agachamento Frontal Com Barra', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/agachamento_frontal_com_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Agachamento Frontal Com Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Agachamento Frontal Gaiola', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/agachamento_frontal_gaiola.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Agachamento Frontal Gaiola');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Agachamento Havaiano', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/agachamento_havaiano.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Agachamento Havaiano');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Agachamento Máquina', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/agachamento_máquina.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Agachamento Máquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Agachamento Pendulo', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/agachamento_pendulo.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Agachamento Pendulo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Agachamento Pistola Uni', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/agachamento_pistola_uni.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Agachamento Pistola Uni');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Agachamento Pistola', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/agachamento_pistola.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Agachamento Pistola');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Agachamento Polia Baixa', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/agachamento_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Agachamento Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Agachamento Reverso', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/agachamento_reverso.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Agachamento Reverso');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Agachamento Sumô Com Barra', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/agachamento_sumô_com_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Agachamento Sumô Com Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Agachamento Sumô Pilé', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/agachamento_sumô-pilé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Agachamento Sumô Pilé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Agachamento Zercher', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/agachamento_zercher.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Agachamento Zercher');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Alavanca De Abdção', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/alavanca_de_abdção.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Alavanca De Abdção');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Avanço', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/avanço.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Avanço');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Clean', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/barbell_clean.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Clean');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Lateral', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/barbell_lateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Lateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Afundo', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/barbell_lunge.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Afundo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Step Up', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/barbell_step_up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Step Up');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Good Morning', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/barbell-good-morning.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Good Morning');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Romanian Levantamento Terra Movement', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/barbell-romanian-deadlift-movement.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Romanian Levantamento Terra Movement');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Benefits Of Farmers Walks', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/benefits-of-farmers-walks.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Benefits Of Farmers Walks');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bom Dia Com Barra', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/bom_dia_com_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bom Dia Com Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bom Dia Com Halter', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/bom_dia_com_halter.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bom Dia Com Halter');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Bulgarian Split Spuat', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/bulgarian-split-spuat.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Bulgarian Split Spuat');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Búlgaro Com Barra', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/búlgaro_com_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Búlgaro Com Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Búlgaro Com Halteres', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/búlgaro_com_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Búlgaro Com Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Búlgaro', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/búlgaro.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Búlgaro');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Dead Lift', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/dead_lift.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Dead Lift');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Good Morning', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/dumbbell-good-morning.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Good Morning');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Stiff Leg Levantamento Terra', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/dumbbell-stiff-leg-deadlift.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Stiff Leg Levantamento Terra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Extensor De Joelhos', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/extensor_de_joelhos.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Extensor De Joelhos');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Extensão De Joelhos', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/extensão_de_joelhos.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Extensão De Joelhos');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Extensão Polia', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/extensão_polia.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Extensão Polia');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Extensão Unilateral', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/extensão_unilateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Extensão Unilateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Alta Polia', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/flexão_alta_polia.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Alta Polia');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão De Joelho Unilateral', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/flexão_de_joelho_unilateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão De Joelho Unilateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão De Joelhos Deitado', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/flexão_de_joelhos_deitado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão De Joelhos Deitado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão De Joelhos Sentado', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/flexão_de_joelhos_sentado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão De Joelhos Sentado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Deitada Polia', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/flexão_deitada_polia.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Deitada Polia');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Deitado Unilateral', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/flexão_deitado_unilateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Deitado Unilateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Estendida Polia', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/flexão_estendida_polia.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Estendida Polia');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Unilateral Ajoelhado', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/flexão_unilateral_ajoelhado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Unilateral Ajoelhado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Unilateral', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/flexão_unilateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Unilateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Frontal Barra', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/frontal_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Frontal Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Knee Extensão', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/knee-extension.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Knee Extensão');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Lateral Step Up Muscles', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/lateral-step-up-muscles.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Lateral Step Up Muscles');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Leg Desenvolvimento Abd', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/leg_press_abd.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Leg Desenvolvimento Abd');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Leg Desenvolvimento Horizontal', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/leg_press_horizontal.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Leg Desenvolvimento Horizontal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Leg Desenvolvimento Smith', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/leg_press_smith.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Leg Desenvolvimento Smith');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Leg Desenvolvimento Unilateral', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/leg_press_unilateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Leg Desenvolvimento Unilateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Leg Extensão Toes Inward', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/leg-extension-toes-inward.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Leg Extensão Toes Inward');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Leg Desenvolvimento', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/leg-press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Leg Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Levantamento Terra Romeno', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/levantamento_terra_romeno.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Levantamento Terra Romeno');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Levantamento Terra Sumô', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/levantamento_terra_sumô.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Levantamento Terra Sumô');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Levantamento Terra', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/levantamento_terra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Levantamento Terra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Afundo Com Halteres', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/lunge_com_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Afundo Com Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Afundo Reverso', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/lunge_reverso.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Afundo Reverso');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Afundo Uni', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/lunge_uni.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Afundo Uni');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Lying Leg Rosca', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/lying-leg-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Lying Leg Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Narrow Stance Leg Desenvolvimento', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/narrow-stance-leg-press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Narrow Stance Leg Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Passada Andando', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/passada_andando.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Passada Andando');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Polia Ag', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/polia_ag.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Polia Ag');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Posterior Fixo', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/posterior_fixo.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Posterior Fixo');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Desenvolvimento Unilateral', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/press_unilateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Desenvolvimento Unilateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Pvc Hinge Example', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/pvc-hinge-example.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Pvc Hinge Example');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Quadríceps Femoral', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/quadríceps_femoral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Quadríceps Femoral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Rack Agachamento Máquina', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/rack_squat_máquina.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Rack Agachamento Máquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Reverse Hyperextension', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/reverse-hyperextension.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Reverse Hyperextension');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Reverso', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/reverso.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Reverso');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Sentado Leg Rosca', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/seated-leg-curl.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Sentado Leg Rosca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Single Leg Leg Extensão', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/single-leg-leg-extension.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Single Leg Leg Extensão');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Smith Máquina Agachamento Benefits', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/smith-machine-squat-benefits.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Smith Máquina Agachamento Benefits');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Step Lateral', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/step_lateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Step Lateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Step Up Com Flexão', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/step_up_com_flexão.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Step Up Com Flexão');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Step Up', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/step_up.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Step Up');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Stiff Barra Costas', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/stiff_barra_costas.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Stiff Barra Costas');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Stiff Barra', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/stiff_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Stiff Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Stiff Perna Extendida', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/stiff_perna_extendida.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Stiff Perna Extendida');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Sumo Dumbell', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/sumo_dumbell.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Sumo Dumbell');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Sumô Dumbell', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/sumô_dumbell.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Sumô Dumbell');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Sumô', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/sumô.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Sumô');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Terra Barra Armadilha', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/terra_barra_armadilha.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Terra Barra Armadilha');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Terra Pro', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/terra_pro.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Terra Pro');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Up Banco Com Halter', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/up_banco_com_halter.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Up Banco Com Halter');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Up Caixote', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/up_caixote.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Up Caixote');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Up Unilateral Caixote', 'Membros inferiores', 'https://cdn.metsuke.app.br/exercises/membros inferiores/up_unilateral_caixote.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Up Unilateral Caixote');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Arnold Desenvolvimento', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/arnold_press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Arnold Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Arnold Presses', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/arnold-presses.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Arnold Presses');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Barra Push Jerk Muscles', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/barbell-push-jerk-muscles.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Barra Push Jerk Muscles');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Unilateral Lateral Elevação', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/cable-one-arm-lateral-raise.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Unilateral Lateral Elevação');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Shoulder Desenvolvimento', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/cable-shoulder-press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Shoulder Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Circular De Ombro', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/circular_de_ombro.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Circular De Ombro');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Crucifixo Inverso', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/crucifixo_inverso.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Crucifixo Inverso');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cuban Desenvolvimento', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/cuban_press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cuban Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Delta Fly', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/delta_fly.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Delta Fly');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Desenvolvimento Com Halteres', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/desenvolvimento_com_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Desenvolvimento Com Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Desenvolvimento Em Pé', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/desenvolvimento_em_pé.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Desenvolvimento Em Pé');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Desenvolvimento Máquina', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/desenvolvimento_máquina.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Desenvolvimento Máquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Desenvolvimento Por Trás Barra', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/desenvolvimento_por_trás_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Desenvolvimento Por Trás Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Desenvolvimento Smith', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/desenvolvimento_smith.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Desenvolvimento Smith');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Desenvolvimento Unilateral', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/desenvolvimento_unilateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Desenvolvimento Unilateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Military Desenvolvimento', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/dumbbell-military-press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Military Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevaçao Lateral Com Apoio', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/elevaçao_lateral_com_apoio.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevaçao Lateral Com Apoio');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação 6', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/elevação_6.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação 6');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação Frontal Barra', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/elevação_frontal_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação Frontal Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação Frontal Polia Baixa', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/elevação_frontal_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação Frontal Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação Frontal Sentado', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/elevação_frontal_sentado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação Frontal Sentado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação Frontal Unilateral Polia Baixa', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/elevação_frontal_unilateral_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação Frontal Unilateral Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação Frontal', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/elevação_frontal.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação Frontal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação Lateral Alavanca', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/elevação_lateral_alavanca.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação Lateral Alavanca');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação Lateral Cruzada', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/elevação_lateral_cruzada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação Lateral Cruzada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação Lateral Flexionada', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/elevação_lateral_flexionada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação Lateral Flexionada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação Lateral Inclinada', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/elevação_lateral_inclinada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação Lateral Inclinada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação Lateral Inclinado', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/elevação_lateral_inclinado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação Lateral Inclinado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação Lateral', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/elevação_lateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação Lateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Elevação Unilateral Polia Baixa', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/elevação_unilateral_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Elevação Unilateral Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Fly Inverso', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/fly_inverso.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Fly Inverso');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Frontal 2 Vias', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/front_2_vias.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Frontal 2 Vias');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Frontal Dumblle', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/frontal_dumblle.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Frontal Dumblle');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Frontal Unilateral', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/frontal_unilateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Frontal Unilateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Inclinado Polia Baixa', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/inclinado_polia_baixa.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Inclinado Polia Baixa');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Inverso Curvado', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/inverso_curvado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Inverso Curvado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Inverso', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/inverso.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Inverso');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Landmine Desenvolvimento', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/landmine-press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Landmine Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Lateral Frontal Halteres', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/lateral_frontal_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Lateral Frontal Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Lateral Sentado', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/lateral_sentado.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Lateral Sentado');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Lateral Elevação Máquina', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/lateral-raise-machine.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Lateral Elevação Máquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Manguito', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/manguito.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Manguito');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Meio Arnold Desenvolvimento', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/meio_arnold_press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Meio Arnold Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Military Desenvolvimento', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/military-press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Military Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Push Desenvolvimento', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/push-press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Push Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Remada Inversa Flexionada', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/remada_inversa_flexionada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Remada Inversa Flexionada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Sentado Overhead Desenvolvimento', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/seated-overhead-press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Sentado Overhead Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Shoulder Pin Desenvolvimento', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/shoulder-pin-press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Shoulder Pin Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Z Desenvolvimento', 'Ombro', 'https://cdn.metsuke.app.br/exercises/ombro/z-press.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Z Desenvolvimento');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Cabo Em Pé Calf Elevação', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/cable-standing-calf-raise.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Cabo Em Pé Calf Elevação');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Calf Squats', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/calf-squats.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Calf Squats');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Donkey Calf Elevação', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/donkey-calf-raise.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Donkey Calf Elevação');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Halter Calf Elevação', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/dumbbell-calf-raise.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Halter Calf Elevação');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Plantar Com Apoio', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/flexão_plantar_com_apoio.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Plantar Com Apoio');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Plantar Com Halteres', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/flexão_plantar_com_halteres.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Plantar Com Halteres');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Plantar Escada', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/flexão_plantar_escada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Plantar Escada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Plantar Leg Horizontal', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/flexão_plantar_leg_horizontal.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Plantar Leg Horizontal');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Plantar No Leg 45', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/flexão_plantar_no_leg_45.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Plantar No Leg 45');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Plantar No Step Com Barra', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/flexão_plantar_no_step_com_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Plantar No Step Com Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Flexão Plantar No Step', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/flexão_plantar_no_step.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Flexão Plantar No Step');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Leg Desenvolvimento Calf Elevação', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/leg-press-calf-raise.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Leg Desenvolvimento Calf Elevação');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Negative Calf Elevação', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/negative-calf-raise.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Negative Calf Elevação');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Panturrilha Em Pe Maquina', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/panturrilha_em_pe_maquina.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Panturrilha Em Pe Maquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Panturrilha Inclinada', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/panturrilha_inclinada.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Panturrilha Inclinada');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Panturrilha Máquina', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/panturrilha_máquina.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Panturrilha Máquina');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Panturrilha Sentado Com Barra', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/panturrilha_sentado_com_barra.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Panturrilha Sentado Com Barra');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Panturrilha Solo Unilateral', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/panturrilha_solo_unilateral.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Panturrilha Solo Unilateral');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Panturrilha Unilateral Leg', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/panturrilha_unilateral_leg.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Panturrilha Unilateral Leg');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Sentado Calf Elevação Halter', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/seated-calf-raise-dumbbell.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Sentado Calf Elevação Halter');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Sentado Calf Elevação', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/seated-calf-raise.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Sentado Calf Elevação');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Single Leg Calf Elevação', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/single-leg-calf-raise.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Single Leg Calf Elevação');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Smith Máquina Calf Elevação', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/smith-machine-calf-raise.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Smith Máquina Calf Elevação');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Em Pé Calf Elevação (1)', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/standing-calf-raise_(1).mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Em Pé Calf Elevação (1)');
                
                INSERT INTO exercises (name, muscle_group, video_url) 
                SELECT 'Em Pé Calf Elevação', 'Panturrilha', 'https://cdn.metsuke.app.br/exercises/panturrilha/standing-calf-raise.mp4'
                WHERE NOT EXISTS (SELECT 1 FROM exercises WHERE name = 'Em Pé Calf Elevação');
                