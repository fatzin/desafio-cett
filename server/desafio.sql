PGDMP     
                    {            desafio    15.3    15.3 !               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                        0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            !           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            "           1262    22636    desafio    DATABASE     ~   CREATE DATABASE desafio WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE desafio;
                postgres    false            �            1259    22718    comentarios    TABLE     �   CREATE TABLE public.comentarios (
    id integer NOT NULL,
    conteudo text,
    id_post integer,
    id_usuario integer,
    curtidas integer DEFAULT 0,
    hora_criacao timestamp without time zone DEFAULT now()
);
    DROP TABLE public.comentarios;
       public         heap    postgres    false            �            1259    22717    comentarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comentarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.comentarios_id_seq;
       public          postgres    false    219            #           0    0    comentarios_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.comentarios_id_seq OWNED BY public.comentarios.id;
          public          postgres    false    218            �            1259    22738    curtidas    TABLE     `   CREATE TABLE public.curtidas (
    id_usuario integer NOT NULL,
    id_post integer NOT NULL
);
    DROP TABLE public.curtidas;
       public         heap    postgres    false            �            1259    22702    posts    TABLE       CREATE TABLE public.posts (
    id integer NOT NULL,
    imagem character varying(255),
    texto text,
    id_usuario integer,
    curtidas integer DEFAULT 0,
    comentarios integer DEFAULT 0,
    hora_criacao timestamp without time zone DEFAULT now()
);
    DROP TABLE public.posts;
       public         heap    postgres    false            �            1259    22701    posts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.posts_id_seq;
       public          postgres    false    217            $           0    0    posts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;
          public          postgres    false    216            �            1259    22692    usuarios    TABLE     %  CREATE TABLE public.usuarios (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    nome character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    senha character varying(255) NOT NULL,
    data_nascimento date,
    imagem character varying(255)
);
    DROP TABLE public.usuarios;
       public         heap    postgres    false            �            1259    22691    usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public          postgres    false    215            %           0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public          postgres    false    214            x           2604    22721    comentarios id    DEFAULT     p   ALTER TABLE ONLY public.comentarios ALTER COLUMN id SET DEFAULT nextval('public.comentarios_id_seq'::regclass);
 =   ALTER TABLE public.comentarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            t           2604    22705    posts id    DEFAULT     d   ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);
 7   ALTER TABLE public.posts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            s           2604    22695    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215                      0    22718    comentarios 
   TABLE DATA           `   COPY public.comentarios (id, conteudo, id_post, id_usuario, curtidas, hora_criacao) FROM stdin;
    public          postgres    false    219   �%                 0    22738    curtidas 
   TABLE DATA           7   COPY public.curtidas (id_usuario, id_post) FROM stdin;
    public          postgres    false    220   8&                 0    22702    posts 
   TABLE DATA           c   COPY public.posts (id, imagem, texto, id_usuario, curtidas, comentarios, hora_criacao) FROM stdin;
    public          postgres    false    217   U&                 0    22692    usuarios 
   TABLE DATA           ]   COPY public.usuarios (id, username, nome, email, senha, data_nascimento, imagem) FROM stdin;
    public          postgres    false    215   '       &           0    0    comentarios_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.comentarios_id_seq', 21, true);
          public          postgres    false    218            '           0    0    posts_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.posts_id_seq', 14, true);
          public          postgres    false    216            (           0    0    usuarios_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuarios_id_seq', 3, true);
          public          postgres    false    214            �           2606    22726    comentarios comentarios_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.comentarios DROP CONSTRAINT comentarios_pkey;
       public            postgres    false    219            �           2606    22742    curtidas curtidas_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.curtidas
    ADD CONSTRAINT curtidas_pkey PRIMARY KEY (id_usuario, id_post);
 @   ALTER TABLE ONLY public.curtidas DROP CONSTRAINT curtidas_pkey;
       public            postgres    false    220    220            ~           2606    22711    posts posts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_pkey;
       public            postgres    false    217            |           2606    22699    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            postgres    false    215            �           2606    22727 $   comentarios comentarios_id_post_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_id_post_fkey FOREIGN KEY (id_post) REFERENCES public.posts(id);
 N   ALTER TABLE ONLY public.comentarios DROP CONSTRAINT comentarios_id_post_fkey;
       public          postgres    false    219    217    3198            �           2606    22732 '   comentarios comentarios_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id);
 Q   ALTER TABLE ONLY public.comentarios DROP CONSTRAINT comentarios_id_usuario_fkey;
       public          postgres    false    3196    219    215            �           2606    22748    curtidas curtidas_id_post_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.curtidas
    ADD CONSTRAINT curtidas_id_post_fkey FOREIGN KEY (id_post) REFERENCES public.posts(id);
 H   ALTER TABLE ONLY public.curtidas DROP CONSTRAINT curtidas_id_post_fkey;
       public          postgres    false    220    217    3198            �           2606    22743 !   curtidas curtidas_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.curtidas
    ADD CONSTRAINT curtidas_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id);
 K   ALTER TABLE ONLY public.curtidas DROP CONSTRAINT curtidas_id_usuario_fkey;
       public          postgres    false    220    3196    215            �           2606    22712    posts posts_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id);
 E   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_id_usuario_fkey;
       public          postgres    false    217    215    3196               f   x���1
�0�Y:�/#}َ�-���B!�������")	A`��^ i�hUc��3���Y��ޏ���u޿��U{�8C��(�-m�h�v�Ge���!�            x������ � �         �   x�m�A�0E��)� �tfJi{O������5\x��ń7Jf���P��$�<�p��R)9���^�4q�mM�	��"뚶���W��H�`��m������}�0��p$ٰz�(����`v��� �9/p��t2,�r�#<�h�2�[�i��I+��C�U�,k';%�� :a>u         k   x�3�LL����tLI��,�p��^iZ�^R���1����������g��1gZjNfA*H�̂
�;��&f��%��b�fș�XR�E�2��e&�f��b���� v.�     